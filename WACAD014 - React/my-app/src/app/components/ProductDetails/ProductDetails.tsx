"use client";

import { ProdutoType } from "@/app/types/Produto.types";
import Image from "next/image";

interface ProductDetailsProps {
  produto: ProdutoType;
}

export default function ProductDetails({ produto }: ProductDetailsProps) {
  return (
    <>
      <h5 className="card-title mb-4 fw-bold">{produto.nome}</h5>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 mb-3">
        <Image
          key={""}
          src={produto.fotos[0].src}
          alt={produto.id}
          width={300}
          height={320}
        />
      </div>

      <p className="card-text fw-medium">
        Valor: R${Number(produto.preco).toFixed(2)}
      </p>
      <p className="card-text fw-medium">Descrição: {produto.descricao}</p>
      <p className="card-text fw-medium">Anunciado por: {produto.usuario_id}</p>
    </>
  );
}
