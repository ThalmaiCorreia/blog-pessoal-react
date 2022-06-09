import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './paginas/home/Home';
import Navbar from './componentes/estaticos/navbar/Navbar';
import Footer from './componentes/estaticos/footer/Footer';
import Login from './paginas/login/Login';
import CadastroUsuario from './paginas/cadastroUsuario/CadastroUsuario';
import './App.css';
import ListaPostagem from './componentes/postagens/listapostagem/ListaPostagem';
import ListaTema from './componentes/temas/listatema/ListaTema';
import CadastroPostagem from './componentes/postagens/cadastropost/CadastroPostagem';
import CadastroTema from './componentes/temas/cadastrartema/CadastroTema';
import DeletarPostagem from './componentes/postagens/deletarpostagem/DeletarPostagem';
import DeletarTema from './componentes/temas/deletartema/DeletarTema';

import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      {/* <ToastContainer /> */}
      <Router>
        <Navbar />
        <div style={{ minHeight: '100vh' }}>
          <Routes> // Antigo Switch
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cadastro" element={<CadastroUsuario />} />
            <Route path="/temas" element={<ListaTema />} />
            <Route path="/posts" element={<ListaPostagem />} />
            <Route path="/formulariopostagem" element={<CadastroPostagem />} />
            <Route path="/formulariopostagem/:id" element={<CadastroPostagem />} />
            <Route path="/formulariotema" element={<CadastroTema />} />
            <Route path="/formulariotema/:id" element={<CadastroTema />} />
            <Route path="/deletarpostagem/:id" element={<DeletarPostagem />} />
            <Route path="/deletartema/:id" element={< DeletarTema />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
