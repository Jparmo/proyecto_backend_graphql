import axios from "axios"

export const register = ()=>{
    axios.post("http://localhost:8001/api/users/creater",{
    "name":document.getElementById("name").value,
    "email":document.getElementById("emailregister").value,
    "role":document.getElementById("user").value,
    "password":document.getElementById("passwordregister").value
    },{
      withCredentials:true
    }).then(res=>console.log(res))
  }