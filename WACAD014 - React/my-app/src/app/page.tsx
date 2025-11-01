"use client";
import React from "react";
import ListagemProdutos from "./components/ListagemProdutos/ListagemProdutos";
import ResumoCarrinho from "./components/ResumoCarrinho/ResumoCarrinho";
import { mockProdutos } from "./mocks/Produtos.mock";
import { mockItensCarrinho } from "./mocks/ItensCarrinho.mock";

export default function Produtos() {
  return (
    <main>
      <div className="container p-5">
        <ResumoCarrinho itens={mockItensCarrinho} />
        <ListagemProdutos produtos={mockProdutos} />
      </div>
    </main>
  );
}
