"use client";
import { ItemCarrinhoType } from "@/app/types/ItemCarrinho.types";
import React from "react";

interface ItemCarrinhoProps {
  quantidadeTotal: ItemCarrinhoType["quantidade"];
  precoTotal: ItemCarrinhoType["preco"];
}

export default function ResumoCarrinho({
  quantidadeTotal,
  precoTotal,
}: ItemCarrinhoProps) {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title mb-4 fw-light">Resumo do Carrinho</h5>
        <p className="card-text fw-medium">
          Quantidade total: {quantidadeTotal}
        </p>
        <p className="card-text fw-medium">
          Valor total: R$ {precoTotal.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
