const AlojamientoModel = require("../models/alojamiento")

class Alojamientos{
    // aqui podemos tomar los esquemas de mongoose 
    // esquemas
    // con async funcionan los metodos de mongoose para traer la informacion
    async get(query){
        return await AlojamientoModel.findOne(query).exec()
    }
    // son asyn pero nos regresa una promesa y graphql se encarga de procesarla

    //aqui puedo recibir la query, esto se recibe como un objeto, se puede usar solo mencionando uno de los elementos del objeto
    async getAll(query){
        return await AlojamientoModel.find(query)
    }
// crea la data del usuario
    async create(query){
        const alojamiento = await AlojamientoModel.create(query)
        return {alojamiento,success:true}
    }

    async update(query){
        // const product = await ProductModel.findOneAndUpdate(data)
        // return {product,success:true}
        return await AlojamientoModel.findOneAndUpdate({_id:query.id},query.alojamiento, {new:true})
        // return await ProductModel.findByIdAndUpdate(query.id,query.product)
    }

    async delete(query){
        return await AlojamientoModel.findByIdAndDelete({_id:query.id})
    }

}

module.exports = Alojamientos