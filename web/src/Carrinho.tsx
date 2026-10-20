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

  const total = itens.reduce(
    (soma, item) => soma + item.preco * item.quantidade,
    0
  );

  return (
    <section className="carrinho-container">
      <h1>Meu carrinho</h1>

      {itens.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          {itens.map(item => (
            <article key={item.id} className="carrinho-item">
              <h2>{item.nome}</h2>
              <p>Preço unitário: {item.preco.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}</p>

              <label>
                Quantidade:{' '}
                <input
                  type="number"
                  min="0"
                  value={item.quantidade}
                  onChange={e => {
                    const quantidade = Number(e.target.value);
                    if (Number.isInteger(quantidade) && quantidade >= 0) {
                      alterarQuantidade(item.id, quantidade);
                    }
                  }}
                />
              </label>

              <button onClick={() => removerProduto(item.id)}>
                Remover
              </button>
            </article>
          ))}

          <h2>
            Total: {total.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            })}
          </h2>
        </>
      )}
    </section>
  );
}
