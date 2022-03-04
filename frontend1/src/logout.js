import axios from "axios"


export const logout = ()=>{
    return(axios.post("http://localhost:8001/api/auth/logout",{},{
      withCredentials:true
    }).then(res=>console.log(res))
    )
  }