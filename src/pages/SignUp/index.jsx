// Página de Cadastro

import { useState, useContext } from 'react'
import './signup.css';

import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

import { authContext } from '../../contexts/auth';

export default function SignUp() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { SignUp, loadingAuth } = useContext(authContext);

    async function handleSubmit(e) { // O evento será reprensentado pelos dados inseridos pelo usuário antes da submissão
        e.preventDefault(); // Função utilizada para cancelar o evento se ele for cancelável, o que significa que a ação padrão que pertence ao evento não ocorrerá

        if (name !== '' && email !== '' && password !== '') {
          await SignUp(name, email, password)
        }
        else {
            alert('Insira os dados completos!')
        }
    }
    return (
        <div className="container-center">
            <div className="login">
                <div className="login-area">
                    <img src={logo} alt="Logo do sistema de chamados" />
                </div>

                <form onSubmit={handleSubmit}> 
                    <h1>Cadastrar Conta</h1> 

                    <input
                        type="text"
                        placeholder="Nome Completo"
                        value={name}
                        onChange={(e) => setName(e.target.value)} 
                    />

                    <input
                        type="text"
                        placeholder="email@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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

                <Link to="/">Já possui uma conta? Faça Login</Link>

            </div>
        </div>
    );
}