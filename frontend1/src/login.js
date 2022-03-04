import React from "react";
import axios from "axios";

import "./css/login.css";

export function Login() {
  const login = () => {
    return axios
      .post(
        "http://localhost:8001/api/auth/login",
        {
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => console.log(res));
  };

  return (
    <div id="contenedor">
      <div id="hijo">
        <div id="title">LOGIN</div>
      <form >
        <input type="text" placeholder="email@email.com" id="email"></input>
        <input type="text" placeholder="password" id="password"></input>
        <button onClick={login}>Iniciar sesion</button>
      </form>
      </div>
    </div>
  );
}
