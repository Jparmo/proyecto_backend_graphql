import axios from "axios"

export const registerAlojamiento = ()=>{
    axios.post("http://localhost:8001/api/alojamientos/",{
    name:document.getElementById("nameowner").value,
    description:document.getElementById("description").value,
    parking:document.getElementById("parking").value,
    location:document.getElementById("location").value,
    numBath:Number(document.getElementById("numBath").value),
    numRoom:Number(document.getElementById("numRoom").value),
    kitchen:document.getElementById("kitchen").value,
    laundry:document.getElementById("laundry").value,
    price:Number(document.getElementById("price").value)
    },{
      withCredentials:true
    }).then(res=>console.log(res))
  }