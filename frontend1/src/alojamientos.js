import { gql, useLazyQuery } from "@apollo/client"
import { useEffect, useState } from 'react';
import React from "react"
import axios from "axios";
import { registerAlojamiento } from "./registerAlojamiento";


const alojamientoSearch = gql`
query alojamientos ($nameSearch: String, $description: String, $location2: String ){
  alojamientos (name: $nameSearch, description: $description, location: $location2) {
      name
      description
      price
      id
      location
    }
  }
  `

export const Alojamientos = ({alojamientos}) =>{
    const [getAlojamiento,result] = useLazyQuery(alojamientoSearch)
    const [alojamientote, setAlojamiento] = useState(null)

    const showAlojamiento = () =>{
      const owner = document.getElementById('location2').value;
      const descriptions = document.getElementById('descriptions').value;
      {console.log(descriptions)}
      {console.log(owner)}
        if(owner === ''){
        getAlojamiento({variables:{description: descriptions}})
      } else if(descriptions === ''){
          getAlojamiento({variables:{location2: owner}})
      } else{
        getAlojamiento({variables:{location2: owner, description: descriptions}})
      }
      
    }
   {console.log(alojamientote)}
   
    useEffect(()=>{
    if(result.data){
      setAlojamiento(result.data.alojamientos)
    }
    }, [result])

    if(alojamientote){
    return(<div key={alojamientote.id} > 
    
    {alojamientote?.map(alojamientones=><div key={alojamientones.id} id="aloja">
    <div>{alojamientones.name}</div>
    <div>{alojamientones.description}</div>
    <div>{alojamientones.location}</div>
    <div>{alojamientones.id}</div>
    </div>)}
    
    <label>Distancia respecto al centro</label>
        <select name='location' id="location2">
          <option value=''> </option>
          <option value="1 km">1 km</option>
          <option value="2 km">5 km</option>
          <option value="10 km">10 km</option>
          <option value="15 km">15 km</option>
          <option value="20 km">20 km</option>
        </select>
    
    <label>Tipo de alojamiento</label>
    <select name='descriptions' id="descriptions">
          <option value=''> </option>
          <option value="Casa">Casa</option>
          <option value="Habitacion privada">Habitacion privada</option>
          <option value="Habitacion de hotel">Habitacion de hotel</option>
          <option value="Habitacion compartida">Habitacion compartida </option>
    </select>
    <button onClick={() => showAlojamiento()}>Mostrar Alojamiento</button>

    </div>
    )
    }

    const borrar = ids => {
        return (axios.delete("http://localhost:8001/api/alojamientos/"+ ids,
         {
           withCredentials:true
         }).then(res=>console.log(res)))
      }
    
    return(
        <div>
        {alojamientos?.map(alojamienton=><div key={alojamienton.id} id="aloja">
        <div>{alojamienton.name}</div>
        <div>{alojamienton.description}</div>
        <div>{alojamienton.location}</div>
        <button onClick={() => borrar(alojamienton.id)}>Eliminar</button>
        </div>)}


        <label>Distancia respecto al centro</label>
        <select name='location' id="location2">
          <option value=''> </option>
          <option value="1 km">1 km</option>
          <option value="2 km">5 km</option>
          <option value="10 km">10 km</option>
          <option value="15 km">15 km</option>
          <option value="20 km">20 km</option>
        </select>
            <label>Tipo de alojamiento</label>
          <select name='descriptions' id="descriptions">
          <option value=''> </option>
          <option value="Casa">Casa</option>
          <option value="Habitacion privada">Habitacion privada</option>
          <option value="Habitacion de hotel">Habitacion de hotel</option>
          <option value="Habitacion compartida">Habitacion compartida </option>
           </select>
            <button onClick={() => showAlojamiento()}>Mostrar Alojamiento</button>
            
            <form>
        <div id='forms'>
          <label>Nombre del Propietario</label>
        <input type="text" placeholder='Nombre de usuario' id='nameowner'></input>
        <label>Tipo de alojamiento</label>
        <select name='description' id="description">
          <option value="Casa">Casa</option>
          <option value="Habitacion privada">Habitacion privada</option>
          <option value="Habitacion de hotel">Habitacion de hotel</option>
          <option value="Habitacion compartida">Habitacion compartida </option>
        </select>
        <label>Cantidad de Parqueo</label>
        <select name='parqueo' id="parking">
          <option value="no hay parqueo">no hay parqueo</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <label>Distancia respecto al centro</label>
        <select name='location' id="location">
          <option value="1 km">1 km</option>
          <option value="2 km">5 km</option>
          <option value="10 km">10 km</option>
          <option value="15 km">15 km</option>
          <option value="20 km">20 km</option>
        </select>
        <label>Cantidad de baños</label>
        <input type="text" placeholder='Cantidad de banos' id='numBath'></input>
        <input type="text" placeholder='Cantidad de cuartos' id='numRoom'></input>
        <label>Cocina</label>
        <select name='kitchen' id="kitchen">
          <option value="Si">Si</option>
          <option value="No">No</option>
        </select>
        <label>Lavadora</label>
        <select name='laundry' id="laundry">
          <option value="Si">Si</option>
          <option value="No">No</option>
        </select>
        <label>Precio</label>
        <input type="text" placeholder='Precio' id='price'></input>
        <button onClick={registerAlojamiento}>Crear Alojamiento</button>
        </div>
        
      </form>
            </div>
            )
}