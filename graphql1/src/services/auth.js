const Users = require("./users")
const jwt = require("jsonwebtoken")
const { jwt_secret } = require("../config")

class Auth{
    constructor(){
        this.users = new Users()
    }
    
    async login(data){
        
        const user = await this.users.get({email:data.email})

        if(user && user.password == data.password){
                // cuando la autenticacion fue exitosa debe generar un token
                // propiedades que si vamos a usar
                const data ={
                    email:user.email,
                    role:user.role
                }
                // objeto plano y solo mostramos lo que queremos
                const token = jwt.sign(data,jwt_secret, {expiresIn: "1d"})
                // generacion de token
                // sign permite generar un token hay que ponerle un secret
                // para que queden las propiedades del usuario ...(operador spread)
                // const token = jwt.sign({...user},"12345", {expiresIn: "1d"})
                return{
                logged: true,
                user,
                token,
                message:"Inicio correcto"
                }
        }
        return{
            logged:false,
            message:"Credenciales incorrectas"
        }
    }

    // metodo para verificar la cookie
    verify(token){
        const user = jwt.verify(token,jwt_secret)
        console.log(user)
        return user
    }
}

module.exports = Auth