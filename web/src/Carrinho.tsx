import { useState } from 'react';
import {
  buscarCarrinho,
  salvarCarrinho,
  type ItemCarrinho
} from './carrinho';

export default function Carrinho() {
  const [itens, setItens] = useState<ItemCarrinho[]>(() =>
    buscarCarrinho()
  );

  function atualizarCarrinho(novosItens: ItemCarrinho[]) {
    setItens(novosItens);
    salvarCarrinho(novosItens);
  }

  function alterarQuantidade(id: number, quantidade: number) {
    const novosItens = itens
      .map(item =>
        item.id === id ? { ...item, quantidade } : item
      )
      .filter(item => item.quantidade > 0);

    atualizarCarrinho(novosItens);
  }

  function removerProduto(id: number) {
    atualizarCarrinho(itens.filter(item => item.id !== id));
  }
  function finalizarCompra() {
  if (itens.length === 0) {
    return;
  }

  salvarCarrinho([]);
  setItens([]);

  alert('Compra finalizada com sucesso! Obrigado por comprar na Doce Vida! 💜');
}

  const total = itens.reduce(
    (soma, item) => soma + item.preco * item.quantidade,
    0
  );

  return (
    <section className="carrinho-container">
      <h1 className="carrinho-titulo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="42"
          height="42"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        Meu carrinho
      </h1>

      {itens.length === 0 ? (
        <p className="carrinho-vazio">
          Seu carrinho está vazio.
        </p>
      ) : (
        <div className="carrinho-card">
          {itens.map(item => (
            <article key={item.id} className="carrinho-item">
  <img
    src={item.imagem}
    alt={item.nome}
    className="carrinho-imagem"
  />

  <div className="carrinho-info">
                <h2>{item.nome}</h2>

                <p>
                  Preço unitário:{' '}
                  {item.preco.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </p>

                <div className="carrinho-controles">
                  <label>
                    Quantidade:
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={item.quantidade}
                      onChange={e => {
                        const quantidade = e.currentTarget.valueAsNumber;

                        if (
                          Number.isInteger(quantidade) &&
                          quantidade >= 1
                        ) {
                          alterarQuantidade(item.id, quantidade);
                        }
                      }}
                    />
                  </label>

                  <button
                    className="carrinho-remover"
                    onClick={() => removerProduto(item.id)}

                  >
                    Remover
                  </button>
                </div>
              </div>

              <p className="carrinho-subtotal">
                {(item.preco * item.quantidade).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </p>
            </article>
          ))}

          <div className="carrinho-total">
            <h2>Total:</h2>

            <strong>
              {total.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
            </strong>
          </div>

          <button
  className="carrinho-finalizar"
  onClick={finalizarCompra}
>
  Finalizar compra
</button>
        </div>
      )}
    </section>
  );
}