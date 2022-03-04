const{mongoose} = require("../config/db")

const{Schema} = mongoose

const alojamientoSchema = new Schema({
    name:String,
    description:String,
    parking:String,
    location:String,
    numBath:Number,
    numRoom:Number,
    kitchen:String,
    laundry:String,
    price:Number
})

const AlojamientoModel = mongoose.model("alojamientos",alojamientoSchema)

module.exports =  AlojamientoModel