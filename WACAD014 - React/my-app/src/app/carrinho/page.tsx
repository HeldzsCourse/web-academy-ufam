"use client";
import React from "react";
import ResumoCarrinho from "../components/ResumoCarrinho/ResumoCarrinho";
import ListagemCarrinho from "../components/ListagemCarrinho/ListagemCarrinho";
import { mockItensCarrinho } from "../mocks/ItensCarrinho.mock";

export default function Carrinho() {
  const [carrinho, setCarrinho] = React.useState(mockItensCarrinho);

  const removerItemDoCarrinho = (id: string) => {
    const novoCarrinho = carrinho.filter((item) => item.id !== id);
    setCarrinho(novoCarrinho);
  }

  const precoTotal = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
  const quantidadeTotal = carrinho.reduce((acc, item) => acc + item.quantidade, 0);

  return (
    <main>
      <div className="container p-5">
        <ResumoCarrinho quantidadeTotal={quantidadeTotal} precoTotal={precoTotal} />
        <ListagemCarrinho carrinho={carrinho} removerItemDoCarrinho={removerItemDoCarrinho} />
      </div>
    </main>
  );
}
