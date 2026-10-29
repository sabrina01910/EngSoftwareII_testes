import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
} from 'react-router-dom';

import './App.css';

import Index from './Index';
import Sobre from './Sobre';
import Carrinho from './Carrinho.tsx';
import Login from './Login';
import Cadastro from './Cadastro';

export default function App() {
  const [logado, setLogado] = useState(() => {
  return localStorage.getItem('docevida_logado') === 'true';
});

  return (
    <BrowserRouter>
      <div className="app-container">
        {logado && (
          <>
            <div className="top-bar">
              <div>✉ contato@docevida.com.br</div>
              <div className="top-logo-badge">DOCE VIDA</div>
              <div>📞 (11) 99999-8888</div>
            </div>

            <nav className="navbar">
              <NavLink to="/" end className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }>
                Home
              </NavLink>

              <NavLink to="/sobre" className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }>
                Sobre Nós
              </NavLink>

              <NavLink to="/carrinho" className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }>
                Carrinho
              </NavLink>

              <button
                className="nav-link"
                onClick={() => {
                  localStorage.removeItem('docevida_logado');
                  setLogado(false);
                }}
              >
                Sair
              </button>
            </nav>
          </>
        )}

        <main>
          <Routes>
            <Route
              path="/login"
              element={
                logado
                  ? <Navigate to="/" replace />
                  :<Login
  onLogin={() => {
    localStorage.setItem('docevida_logado', 'true');
    setLogado(true);
  }}
/>
              }
            />

            <Route
              path="/cadastro"
              element={
                logado
                  ? <Navigate to="/" replace />
                  : <Cadastro />
              }
            />

            <Route
              path="/"
              element={
                logado ? <Index /> : <Navigate to="/login" replace />
              }
            />

            <Route
              path="/sobre"
              element={
                logado ? <Sobre /> : <Navigate to="/login" replace />
              }
            />

            <Route
              path="/carrinho"
              element={
                logado ? <Carrinho /> : <Navigate to="/login" replace />
              }
            />

            <Route
              path="*"
              element={
                <Navigate to={logado ? "/" : "/login"} replace />
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}