"use client";
import React from "react";
import ResumoCarrinho from "../components/ResumoCarrinho/ResumoCarrinho";
import ListagemCarrinho from "../components/ListagemCarrinho/ListagemCarrinho";
import { mockItensCarrinho } from "../mocks/ItensCarrinho.mock";

export default function Carrinho() {
  return (
    <main>
      <div className="container p-5">
        <ResumoCarrinho quantidadeTotal={} precoTotal={} />
        <ListagemCarrinho carrinho={mockItensCarrinho} />
      </div>
    </main>
  );
}
