"use client";
import { ItemCarrinhoType } from "@/app/types/ItemCarrinho.types";
import React from "react";

interface ItemCarrinhoProps {
  itens: ItemCarrinhoType[];
}

export default function ResumoCarrinho({ itens }: ItemCarrinhoProps) {
  const valorTotal = (precoUnitario: number, quantidade: number): number =>
    precoUnitario * quantidade;

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title mb-4 fw-light">Resumo do Carrinho</h5>
        <p className="card-text fw-medium">
          Quantidade total:{" "}
          {itens.reduce((total, item) => total + item.quantidade, 0)}
        </p>
        <p className="card-text fw-medium">
          Valor total: R${" "}
          {itens
            .reduce(
              (total, item) => total + valorTotal(item.preco, item.quantidade),
              0
            )
            .toFixed(2)}
        </p>
      </div>
    </div>
  );
}
