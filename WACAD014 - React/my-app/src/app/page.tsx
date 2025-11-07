"use client";
import React from "react";
import ListagemProdutos from "./components/ListagemProdutos/ListagemProdutos";
import ResumoCarrinho from "./components/ResumoCarrinho/ResumoCarrinho";
import { mockProdutos } from "./mocks/Produtos.mock";
import { mockItensCarrinho } from "./mocks/ItensCarrinho.mock";
import { ReactQueryClientProvider } from "./components/ReactQueryClient/ReactQueryClient";

export default function Produtos() {
  const [quantidade, setQuantidade] = React.useState<number>(0);
  const [preco, setPreco] = React.useState<number>(0);

  function adicionarAoCarrinho(precoItem: number, quantidadeItem: number) {
    setQuantidade(quantidade + quantidadeItem);
  }

  return (
    <ReactQueryClientProvider>
      <main>
        <div className="container p-5">
          <ResumoCarrinho quantidadeTotal={quantidade} precoTotal={preco}/>
          <ListagemProdutos produtos={mockProdutos} />
        </div>
      </main>
    </ReactQueryClientProvider>
  );
}
