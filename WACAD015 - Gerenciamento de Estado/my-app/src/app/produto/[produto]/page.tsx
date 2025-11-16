"use client";

import { useParams } from "next/navigation";
import { useInfoProduto } from "@/app/hooks/useInfoProduto";
import ProductDetails from "@/app/components/ProductDetails/ProductDetails";

export default function Produto() {
  const param = useParams();

  const { produto, isPending, isError } = useInfoProduto(
    param.produto as string
  );

  if (isError) {
    return <p>Ocorreu um erro ao carregar o produto.</p>;
  }

  return (
    <main>
      <div className="container p-5">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title mb-4 fw-light">Detalhes do produto</h5>
            {isPending ? (
              <h5 className="card-title mb-4 fw-bold">Carregando...</h5>
            ) : !produto ? (
              <p>Produto não encontrado.</p>
            ) : (
              <ProductDetails produto={produto} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
