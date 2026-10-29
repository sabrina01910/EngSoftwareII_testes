import { useState } from 'react';
import { Link } from 'react-router-dom';
import { buscarUsuarios } from './usuarios';

type LoginProps = {
  onLogin: () => void;
};

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  function entrar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email.trim() || !senha) {
      setMensagem('Preencha todos os campos para continuar.');
      return;
    }

    const usuarios = buscarUsuarios();

const usuarioEncontrado = usuarios.find(
  usuario =>
    usuario.email.toLowerCase() === email.trim().toLowerCase() &&
    usuario.senha === senha
);

if (!usuarioEncontrado) {
  setMensagem('E-mail ou senha incorretos. Confira seus dados ou cadastre-se.');
  return;
}

onLogin();
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <Link to="/" className="auth-logo">
          Doce Vida
        </Link>

        <p className="auth-subtitle">Um toque de doçura no seu dia</p>

        <h1>Bem-vindo de volta!</h1>
        <p className="auth-description">
          Entre para continuar sua experiência com nossos doces.
        </p>

        <form className="auth-form" onSubmit={entrar}>
          <label htmlFor="login-email">E-mail</label>
          <input
            id="login-email"
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              setMensagem('');
            }}
            required
          />

          <label htmlFor="login-senha">Senha</label>
          <input
            id="login-senha"
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={e => {
              setSenha(e.target.value);
              setMensagem('');
            }}
            required
          />

          <button type="submit" className="auth-button">
            Entrar
          </button>

          {mensagem && (
            <p className="auth-message" role="status">
              {mensagem}
            </p>
          )}
        </form>

        <p className="auth-switch">
          Ainda não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>

        <Link to="/" className="auth-back">
          ← Voltar para a loja
        </Link>
      </section>
    </main>
  );
}