import './App.css';
import {useQuery,gql, useMutation, useLazyQuery} from '@apollo/client'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { Users } from './users';
import { Alojamientos } from './alojamientos';
import { login } from './login';
import { register } from './register';


const query = gql`
  query Users ($nameSearch: String) {
    users{
      name
      email
      role
      id
    }
    alojamientos{
      name
      description
      parking
      location
      numBath
      numRoom
      kitchen
      laundry
      price
      id
  }
  alojamiento(name: $nameSearch) {
      name
      description
      price
      id
    }
  
  }
`





const queryGraphQL = `
query Users {
  users{
    name
    email
    role
    id
  }
}
`

function useAlojamientoFilters(){
  const[filters,_updateFilter] = useState({
    id:undefined,
    name: undefined
  })

  const updateFilter = (filterType,value) => {
    _updateFilter({
      [filterType]:value,
    })
  }
  return{
    models:{ filters },
    operations: { updateFilter }
  }
}

function App() {
  const {loading, data, error} = useQuery(query)
  

  // const { operations, models } = useAlojamientoFilters()
  // const {loading:loadingSearch, data:dataSearch, error:errorSearch, refetch} = useQuery(alojamientoSearch)
  
  
 
  



  return (
      <div>
          {/* {console.log(dataSearch)} */}
          {console.log(data)}
          {loading?<p>Loading</p>:
          // loadingSearch?<p>Loadingsearch</p>:
          error?<p>Error....</p>:
        <div id="grid">
          
          {/* el simbolo de ? ayuda para ver si tiene la propiedad de map que la haga sino se queda alli*/}
          <h2>Usurios</h2>
          < Users users={data?.users}/>
          {/* {data.users?.map(user=><p key={user.id}>{user.name} {user.role}</p>)}, */}
          <h2>Alojamientos</h2>
          < Alojamientos alojamientos={data?.alojamientos}/>
          {/* {dataSearch.alojamientos?.map((alojamiento)=> (<div key={alojamiento.id}>{alojamiento.name}</div>))} */}
          {/* {<div>{data.alojamiento.name}</div>}  */}
            {console.log(data.alojamiento)}
        </div>
      }
      <form>
        <div id='forms'>
        <input type="text" placeholder='email@email.com' id='email'></input>
        <input type="text" placeholder='password' id='password'></input>
        <button onClick={login}>Iniciar sesion</button>
        </div>
        
      </form>


      <form>
        <div id='forms'>
        <input type="text" placeholder='Nombre de usuario' id='name'></input>
        <input type="text" placeholder='email@email.com' id='emailregister'></input>
        <input type="text" placeholder='password' id='passwordregister'></input>
        <select name='role' id="user">
          <option value="CLIENT">Client</option>
          <option value="OWNER">Owner</option>
        </select>
        <button onClick={register}>Crear Usuario</button>
        </div>
        
      </form>
      
      {/* <form>
      <input type="text" placeholder='Nombre de alojamiento' id='nameSearch'></input>
      <button onClick={() => {showAlojamiento(document.getElementById("nameSearch").value)}
        }>Mostrar Alojamiento</button>
      </form> */}

      {/* <form>
      <input type="text" onChange={(event) => operations.updateFilter("name", event.target.value)} placeholder='Nombre de alojamiento' id='nameSearch'></input>
      <button onClick={() =>
          refetch({
            nameSearch: { name: models.filters.name },
          })
        }>Mostrar Alojamiento</button>
      </form> */}

      
      </div>
    )
      }
export default App;
