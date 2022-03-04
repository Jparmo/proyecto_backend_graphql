const mongoose = require("mongoose")

const connection = async() => {
    // lo estamos conectando con db del contenedor
    const conn = await mongoose.connect("mongodb://mongo1/graphql1")  
    console.log('conectado:',conn.connection.host)
}

module.exports = {connection,mongoose}