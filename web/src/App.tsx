import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';

import Index from './Index';
import Sobre from './Sobre';
import Carrinho from './Carrinho';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Topo Superior sem Emoji */}
        <div className="top-bar">
          <div>✉ contato@docevida.com.br</div>
          <div className="top-logo-badge">
            DOCE VIDA
          </div>
          <div>📞 (11) 99999-8888</div>
        </div>

        {/* Menu de Navegação */}
        <nav className="navbar">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
            Home
          </NavLink>
          <NavLink to="/sobre" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Sobre Nós
          </NavLink>
          <NavLink
            to="/carrinho"
            className={({ isActive }) => 'nav-link ${isActive ? 'active' : ''}'}
          >
          Carrinho
        </NavLink>
        </nav>

        {/* Conteúdo Dinâmico */}
        <main>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/carrinho" element={<Carrinho />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
