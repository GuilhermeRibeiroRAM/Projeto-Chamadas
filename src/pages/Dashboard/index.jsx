import { useContext } from 'react'
import { authContext } from '../../contexts/auth';

export default function Dashboard(){
  const { logout } = useContext(authContext);

  async function handleLogout(){
    await logout();
  }

  return(
    <div>
      <h1>Pagina Dashboard</h1>
      <button onClick={handleLogout}>Sair da conta</button>
    </div>
  )
}