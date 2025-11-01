"use client";

import { ItemCarrinhoType } from "@/app/types/ItemCarrinho.types";
import React from "react";

interface ItemCarrinhoProps {
  item: ItemCarrinhoType;
}

export default function ItemCarrinho({ item }: ItemCarrinhoProps) {
  const valorTotalProduto = (
    precoUnitario: number,
    quantidade: number
  ): number => precoUnitario * quantidade;

  return (
    <tr key={item.id}>
      <td>{item.nome}</td>
      <td>R$ {item.preco.toFixed(2)}</td>
      <td>{item.quantidade}</td>

      <td>R$ {valorTotalProduto(item.preco, item.quantidade).toFixed(2)}</td>
      <td>
        <button className="btn btn-danger btn-sm">Remover</button>
      </td>
    </tr>
  );
}
