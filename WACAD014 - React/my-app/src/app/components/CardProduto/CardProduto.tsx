"use client";

import React from "react";
import Image from "next/image";
import { ProdutoType } from "@/app/types/Produto.types";

interface CardProdutoProps {
  produto: ProdutoType;
  adicionarAoCarrinho: (produto: ProdutoType) => void;
}

export default function CardProduto({ produto, adicionarAoCarrinho }: CardProdutoProps) {
  return (
    <div className="col">
      <div className="card shadow-sm h-100">
        <Image
          src={produto.fotos[0].src}
          className="card-img-top"
          alt="imagem placeholder"
          width={300}
          height={320}
        />

        <div className="card-body bg-light">
          <h5 className="card-title">{produto.nome}</h5>
          <p className="card-text text-secondary">R$ {produto.preco}</p>
          <button onClick={() => adicionarAoCarrinho(produto)} className="btn btn-dark d-block w-100" type="button">
            Adicionar no carrinho
          </button>
        </div>
      </div>
    </div>
  );
}
