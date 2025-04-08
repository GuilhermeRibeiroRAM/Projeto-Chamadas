// Página de Renderização Geral

import './index.css';
import { BrowserRouter, Route } from 'react-router-dom';
import RoutesApp from './routes';
import AuthProvider from './contexts/auth';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer autoClose={1800}/>
        <RoutesApp />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;