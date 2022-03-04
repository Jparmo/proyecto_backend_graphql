const { buildSchema } = require("graphql");
const Alojamientos = require("../services/alojamiento");
const Users = require("../services/users");


const userServ = new Users();
const alojamientoServ = new Alojamientos();

const root = {
  hello: () => {
    return "hola mundito";
  },

  users: userServ.getAll,
  updateuser: userServ.update,
  alojamiento: alojamientoServ.get,
  // para get debo usar find en servicios
  alojamientos: alojamientoServ.getAll,
  createAlojamiento:alojamientoServ.create,
  updateAlojamiento:alojamientoServ.update,
  deleteAlojamiento: alojamientoServ.delete
};

const schemas = buildSchema(`
input AlojamientoInput{
  name:String,
  description:String,
  parking:String,
  location:String,
  numBath:Int,
  numRoom:Int,
  entertainment:String,
  kitchen:String,
  laundry:String,
  categories:[String],
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

`);
module.exports = { root, schemas };
