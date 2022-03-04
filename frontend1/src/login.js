import React from "react"
import axios from "axios"

export const login = ()=>{
    return (axios.post("http://localhost:8001/api/auth/login",{
          "email": document.getElementById("email").value,
          "password": document.getElementById("password").value
        },{
          withCredentials:true
        }).then(res=>console.log(res))
            )
}