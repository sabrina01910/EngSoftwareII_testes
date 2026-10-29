import React from 'react';
import { Link } from 'react-router-dom';
import imagemDoce from './assets/doce.png';
import imagemBeijinho from './assets/beijinho-de-coco.png';
import imagemBrigadeiro from './assets/brigadeiro.jpg';
import imagemBrownie from './assets/brownie.webp';
import { adicionarProduto, buscarCarrinho } from './carrinho';

const produtos = [
  {
    id: 1,
    nome: 'Brigadeiro',
    preco: 3.5,
    imagem: imagemBrigadeiro,
  },
  {
    id: 2,
    nome: 'Beijinho',
    preco: 3.0,
    imagem: imagemBeijinho,
  },
  {
    id: 3,
    nome: 'Brownie',
    preco: 6.0,
    imagem: imagemBrownie,
  },
];

export default function Index() {
  function adicionarAoCarrinho(produto: typeof produtos[number]) {
    const carrinhoAtual = buscarCarrinho();
    adicionarProduto(produto, carrinhoAtual);
    alert(`${produto.nome} adicionado ao carrinho!`);
  }

  return (
    <div>
      <section className="hero-dark">
        <div className="hero-content">
          <p className="hero-subtitle">Super Crocante & Artesanal</p>
          <h1 className="hero-title">Doce Vida</h1>
          <p className="hero-desc">
            Sabores inesquecíveis pensados para deixar seus melhores momentos
            ainda mais doces com ingredientes selecionados e muito carinho.
          </p>
          <Link to="/sobre" className="hero-btn">
            Conheça Nossa História &rarr;
          </Link>
        </div>

        <div className="hero-image-wrapper">
          <img
            src={imagemDoce}
            alt="Doces Artesanais Doce Vida"
            className="hero-img"
          />
        </div>
      </section>

      <section className="produtos-section">
        <h2>Nossos Doces</h2>
        <p>Escolha seus favoritos e adicione ao carrinho!</p>

        <div className="produtos-lista">
          {produtos.map((produto) => (
            <article className="produto-card" key={produto.id}>
  <img
    src={produto.imagem}
    alt={produto.nome}
    className="produto-imagem"
  />
  <h3>{produto.nome}</h3>
  <p>
    {produto.preco.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })}
  </p>
  <button onClick={() => adicionarAoCarrinho(produto)}>
    Adicionar ao carrinho
  </button>
</article>
          ))}
        </div>

        <Link to="/carrinho" className="hero-btn">
          Ver meu carrinho
        </Link>
      </section>

      <section className="stats-bar">
        <div className="stat-item">
          <div className="stat-icon">★</div>
          <div>
            <div className="stat-number">100%</div>
            <div className="stat-label">Artesanal</div>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon">🏆</div>
          <div>
            <div className="stat-number">+50</div>
            <div className="stat-label">Receitas Finas</div>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon">🚚</div>
          <div>
            <div className="stat-number">Agendada</div>
            <div className="stat-label">Entrega Rápida</div>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon">♥</div>
          <div>
            <div className="stat-number">+10k</div>
            <div className="stat-label">Clientes Felizes</div>
          </div>
        </div>
      </section>
    </div>
  );
}