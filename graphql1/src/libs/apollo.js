const {gql, AuthenticationError} = require("apollo-server-express")
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config");


const Alojamientos = require("../services/alojamiento")
const Users = require("../services/users")

const userServ = new Users();
const alojamientoServ = new Alojamientos();



const schema = gql`
input AlojamientoInput{
  name:String,
  description:String,
  parking:String,
  location:String,
  numBath:Int,
  numRoom:Int,
  kitchen:String,
  laundry:String,
  price:Float
}

input UserInput{
  name: String
  email: String
  id: String
  role: String
}


type Query{
    hello:String
    me: User
    users(role:String):[User]
    alojamiento(name:String, location:String, _id:String, _input: AlojamientoInput):Alojamiento
    alojamientos(name:String, description:String,
        parking:String,
        location:String,
        numBath:Int,
        numRoom:Int,
        kitchen:String,
        laundry:String,
        price:Float, _id:String, _input: AlojamientoInput): [Alojamiento]
}

type User{
    name: String
    email: String
    id: String
    role: String
}

type Alojamiento{
    name:String,
    description:String,
    parking:String,
    location:String,
    numBath:Int,
    numRoom:Int,
    kitchen:String,
    laundry:String,
    price:Float
    id:String
}

type Mutation{
    createAlojamiento(alojamiento:AlojamientoInput): Alojamiento
    updateAlojamiento(id:String!, alojamiento:AlojamientoInput): Alojamiento
    updateUser(id:String!, user:UserInput): User
}

type Delete{
    deleteAlojamiento(id:String!): [Alojamiento]
  }

`

const resolvers = {
    Query:{
        // como ahora podemos permitir que se realicen ciertas acciones dependiendo tu role
        users:(parent, args, context, info)=>{
            console.log(context)
            // para poder validar
            if(context.role==="ADMIN"){
            return userServ.getAll(args)
            }else{
                return new AuthenticationError("No tienes permisos")
            }
        },
        alojamiento:(parent, args, context, info)=>{
            return alojamientoServ.get(args)
        },
        alojamientos:(parent, args, context, info)=>{
            return alojamientoServ.getAll(args)
        }
        
    } ,
    Mutation:{
        createAlojamiento:(parent, args, context, info)=>{
            return alojamientoServ.create(args)
        },
        updateAlojamiento:(parent, args, context, info)=>{
            return alojamientoServ.update(args)
        },
        updateUser:(parent, args, context, info)=>{
            console.log(args)
            return userServ.update(args)
        }
    },
    Delete:{
        deleteAlojamiento:(parent, args, context, info)=>{
            return alojamientoServ.delete(args)
        }
    }
}

const context = ({req})=>{
    const token = req.cookies.token
    console.log(token)
    if(token){
        // para que solo retorne el email y el role
        const {email,role} = jwt.verify(token,jwt_secret)
        return {email,role}
    }
    // si queremos que retorne algo usamos un else
    else{
        return {role:"UNATHENTICATED"}
    }
    // throw new AuthenticationError(
    //     "token invalido o no proporcionado"
    // )
}

module.exports = {schema,resolvers,context}