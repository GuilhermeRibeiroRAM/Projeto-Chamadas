// Página de Login

import { useState, useContext } from 'react'
import './signin.css';

// useContext = um Hook que permite a utilização dos contextos

import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

import { authContext } from '../../contexts/auth';

import { toast } from 'react-toastify';

export default function SignIn() {

  // Armazenando dados do usuário a partir das States
  // Estado atual: email
  // Função usada para atualizar o estado: setEmail
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { SignIn, loadingAuth } = useContext(authContext);

  async function handleSignIn(e) {
    e.preventDefault();

    if (email !== '' && password !== '') {
      await SignIn(email, password);
    }
    else {
      toast.error("Insira todos os Dados!");
    }

  }

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="Logo do sistema de chamados" />
        </div>

        <form onSubmit={handleSignIn}>
          <h1>Entrar</h1>
          <input
            type="text"
            placeholder="email@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Todos os dados que o usário digitar será captado pelo evento (e) e serão armazenados na state "setEmail"
          />

          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">
            {loadingAuth ? 'Carregando...' : 'Cadastrar'}
          </button>
        </form>

        <Link to="/register">Criar uma conta</Link>

      </div>
    </div>
  )
}