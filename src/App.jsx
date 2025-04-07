// Página de Renderização Geral

import './index.css';
import { BrowserRouter, Route } from 'react-router-dom';
import RoutesApp from './routes';
import AuthProvider from './contexts/auth';


function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <RoutesApp />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App
