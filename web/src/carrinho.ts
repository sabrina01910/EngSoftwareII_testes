export interface ItemCarrinho {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
}

const CHAVE_CARRINHO = 'docevida_carrinho';

export function buscarCarrinho(): ItemCarrinho[] {
  try {
    const dados = localStorage.getItem(CHAVE_CARRINHO);

    return dados ? JSON.parse(dados) as ItemCarrinho[] : [];
  } catch {
    return [];
  }
}

export function salvarCarrinho(itens: ItemCarrinho[]): void {
  localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(itens));
}

export function adicionarProduto(
  produto: Omit<ItemCarrinho, 'quantidade'>,
  carrinhoAtual: ItemCarrinho[]
): ItemCarrinho[] {
  const existente = carrinhoAtual.find(
    item => item.id === produto.id
  );

  const novoCarrinho = existente
    ? carrinhoAtual.map(item =>
        item.id === produto.id
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      )
    : [...carrinhoAtual, { ...produto, quantidade: 1 }];

  salvarCarrinho(novoCarrinho);

  return novoCarrinho;
}
