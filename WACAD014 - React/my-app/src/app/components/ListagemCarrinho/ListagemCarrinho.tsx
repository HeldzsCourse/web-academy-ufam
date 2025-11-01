"use client";

import React from "react";
import ItemCarrinho from "../ItemCarrinho/ItemCarrinho";
import { ItemCarrinhoType } from "@/app/types/ItemCarrinho.types";

interface ListagemCarrinhoProps {
  carrinho: ItemCarrinhoType[];
}

export default function ListagemCarrinho({ carrinho }: ListagemCarrinhoProps) {
  return (
    <div className="card mb-4">
      <div className="row card-body">
        <h5 className="card-title mb-4 fw-light">Produtos selecionados</h5>
        <div className="table-responsive">
          <table className="table ">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Valor Unitário</th>
                <th>Quantidade</th>
                <th>Valor Total</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {carrinho.map((item) => (
                <ItemCarrinho key={item.id} item={item} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
