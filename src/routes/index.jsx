// Página direcionada para Rotas

import { Routes, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';

import Private from './private';

function RoutesApp() {
    return (
        <Routes>
            <Route path='/' element={<SignIn />} />
            <Route path='/register' element={<SignUp />} />

            <Route path='/dashboard' element={<Private><Dashboard /></Private>} />
        </Routes>
    );
}

// path = caminho usado para acessar a rota
// element = qual será o arquivo acessado na rota

export default RoutesApp;