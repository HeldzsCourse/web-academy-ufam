"use client";
import React from "react";
import CardProduto from "../CardProduto/CardProduto";
import { ProdutoType } from "@/app/types/Produto.types";
import { useListaProdutos } from "@/app/hooks/useListaProdutos";

interface ListagemProdutosProps {
  adicionarAoCarrinho: (produto: ProdutoType) => void;
}

export default function ListagemProdutos({
  adicionarAoCarrinho,
}: ListagemProdutosProps) {
  const { produtos, isPending, isError } = useListaProdutos();

  if (isPending) {
    return <p>Carregando...</p>;
  }

  if (isError) {
    return <p>Ocorreu um erro ao carregar os produtos.</p>;
  }

  if (!produtos) {
    return <p>Nenhum produto encontrado.</p>;
  }

  return (
    <>
      <h5 className="mb-3">Produtos disponíveis:</h5>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
        {produtos.map((produto) => (
          <CardProduto
            key={produto.id}
            produto={produto}
            adicionarAoCarrinho={adicionarAoCarrinho}
          />
        ))}
      </div>
    </>
  );
}
