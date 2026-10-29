import { useState } from 'react';
import { Link } from 'react-router-dom';
import { salvarUsuario } from './usuarios';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  function cadastrar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (senha.length < 6) {
      setMensagem('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (senha !== confirmarSenha) {
      setMensagem('As senhas não coincidem.');
      return;
    }

    const cadastrado = salvarUsuario({
      nome,
      email: email.trim(),
      senha,
    });
    if (!cadastrado) {
      setMensagem('Este e-mail já está cadastrado.');
      return;
    }
    setMensagem(
      'Cadastro realizado com sucesso! Agora você pode fazer login.'
    );
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <Link to="/" className="auth-logo">
          Doce Vida
        </Link>

        <p className="auth-subtitle">Um toque de doçura no seu dia</p>

        <h1>Crie sua conta</h1>
        <p className="auth-description">
          Preencha seus dados para fazer parte da nossa loja.
        </p>

        <form className="auth-form" onSubmit={cadastrar}>
          <label htmlFor="cadastro-nome">Nome completo</label>
          <input
            id="cadastro-nome"
            type="text"
            placeholder="Digite seu nome"
            value={nome}
            onChange={e => {
              setNome(e.target.value);
              setMensagem('');
            }}
            required
          />

          <label htmlFor="cadastro-email">E-mail</label>
          <input
            id="cadastro-email"
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              setMensagem('');
            }}
            required
          />

          <label htmlFor="cadastro-senha">Senha</label>
          <input
            id="cadastro-senha"
            type="password"
            placeholder="Mínimo de 6 caracteres"
            value={senha}
            onChange={e => {
              setSenha(e.target.value);
              setMensagem('');
            }}
            minLength={6}
            required
          />

          <label htmlFor="confirmar-senha">Confirmar senha</label>
          <input
            id="confirmar-senha"
            type="password"
            placeholder="Digite a senha novamente"
            value={confirmarSenha}
            onChange={e => {
              setConfirmarSenha(e.target.value);
              setMensagem('');
            }}
            required
          />

          <button type="submit" className="auth-button">
            Criar conta
          </button>

          {mensagem && (
            <p className="auth-message" role="status">
              {mensagem}
            </p>
          )}
        </form>

        <p className="auth-switch">
          Já tem uma conta? <Link to="/login">Faça login</Link>
        </p>

        <Link to="/" className="auth-back">
          ← Voltar para a loja
        </Link>
      </section>
    </main>
  );
}