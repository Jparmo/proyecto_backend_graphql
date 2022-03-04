import React, { useEffect, useState } from "react"
import {useQuery,gql, useMutation, useLazyQuery} from '@apollo/client'

const mutation = gql`
  mutation UpdateUser($id:String!,$user:UserInput){
    updateUser(id:$id,user:$user){
    id
    name
    role
    }
  }
`

const search = gql`

query Users($role: String) {
  users(role: $role) {
    name
    email
    id
    role
  }
}
`

export const Users = ({users}) => {
  const [mutate,{loading,data,error}] = useMutation(mutation)
  const changeRole = () =>{
    mutate({variables:{id:document.getElementById("id").value, user:{role:document.getElementById("role").value}}})
  }

  const [getUser,result] = useLazyQuery(search)
  const [userg, setUser] = useState(null)
  const showUser = name => {
      getUser({variables:{role:name}})
  }
  {console.log(userg)}

  useEffect(()=>{
    if(result.data){
      setUser(result.data.users)
    }
    }, [result])

    if(userg){
      return(<div key={userg.id} > {userg?.map(user=><p key={user.id}>{user.name} {user.role} {user.id}</p>)}
          <button onClick={()=>setUser(null)}>close</button></div>)
      }


    return (
        <div>
        {users?.map(user=><p key={user.id}>{user.name} {user.role} {user.id}</p>)}
        <form>
          <input type="text" placeholder='id' id='id'></input>
          <select name='role' id="role">
          <option value="CLIENT">Client</option>
          <option value="OWNER">Owner</option>
          </select>
          <button onClick={changeRole}>Cambiar Role</button>
        </form>
        <input type="text" placeholder='Role del user' id='nameSearch'></input>
        <button onClick={() => showUser(document.getElementById('nameSearch').value)}>Mostrar Users</button>
        </div>
            )
}

