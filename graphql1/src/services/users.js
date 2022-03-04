const UserModel = require("../models/users")

class Users{
    async get(data){
        return await UserModel.findOne(data).exec()
    }

    async getAll(query){
        // if(query.role){
        //     query.role = {
        //         $all:query.role
        //     }
        // }
        return await UserModel.find(query)
    }
// crea la data del usuario
    async create(data){
        // const user = UserModel(data)
        // await user.save()
        // ya crea el modelo y lo guarda
        const user = await UserModel.create(data)
        return {user,success:true}
    }

    async update(query){
        const user = await UserModel.findOneAndUpdate({_id:query.id},query.user, {new:true})
        user.password = undefined
        return user
        // return await UserModel.findByIdAndUpdate(query.id,query.user)
    }
}

module.exports = Users