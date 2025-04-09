import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { authContext } from '../contexts/auth'

export default function Private({ children }){
  const { signed, loading } = useContext(authContext);

  if(loading){
    return(
      <div></div>
    )
  }

  if(!signed){
    return  <Navigate to="/" />
  }
  return children;
}