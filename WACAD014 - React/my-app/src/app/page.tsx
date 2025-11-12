"use client";
import React from "react";
import ListagemProdutos from "./components/ListagemProdutos/ListagemProdutos";
import ResumoCarrinho from "./components/ResumoCarrinho/ResumoCarrinho";
import { mockProdutos } from "./mocks/Produtos.mock";
// import { mockItensCarrinho } from "./mocks/ItensCarrinho.mock";
import { ReactQueryClientProvider } from "./components/ReactQueryClient/ReactQueryClient";
import { ProdutoType } from "./types/Produto.types";

export default function Produtos() {
  const [quantidade, setQuantidade] = React.useState<number>(0);
  const [preco, setPreco] = React.useState<number>(0);

  function adicionarAoCarrinho(produto: ProdutoType) {
    setQuantidade((prevQuantidade) => prevQuantidade + 1);
    setPreco((prevValor) => prevValor + Number(produto.preco));
  }

  return (
    <ReactQueryClientProvider>
      <main>
        <div className="container p-5">
          <ResumoCarrinho quantidadeTotal={quantidade} precoTotal={preco} />
          <ListagemProdutos
            produtos={mockProdutos}
            adicionarAoCarrinho={adicionarAoCarrinho}
          />
        </div>
      </main>
    </ReactQueryClientProvider>
  );
}
