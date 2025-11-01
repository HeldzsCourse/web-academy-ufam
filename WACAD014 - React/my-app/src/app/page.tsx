"use client";
import React from "react";
import ListagemProdutos from "./components/ListagemProdutos/ListagemProdutos";
import ResumoCarrinho from "./components/ResumoCarrinho/ResumoCarrinho";

export default function Produtos() {
  return (
    <main>
      <div className="container p-5">
        <ResumoCarrinho />
        <ListagemProdutos />
      </div>
    </main>
  );
}
