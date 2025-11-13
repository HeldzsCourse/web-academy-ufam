"use client";

import React from "react";
import FavoritedItem from "../FavoritedItem/FavoritedItem";
import { useListaFavoritos } from "@/app/hooks/useListaFavoritos";

export default function FavoritedProducts() {
  const { favoritos, isPending, isError, refetchFavoritos } =
    useListaFavoritos();

  if (isPending) {
    return <p>Carregando...</p>;
  }

  if (isError) {
    return <p>Ocorreu um erro ao carregar os favoritos.</p>;
  }

  if (!favoritos) {
    return <p>Nenhum produto favorito encontrado.</p>;
  }

  return (
    <div className="card mb-4">
      <div className="row card-body">
        <h5 className="card-title mb-4 fw-light">Produtos Favoritados</h5>
        <div className="table-responsive">
          <table className="table ">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Valor</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {favoritos.map((item) => (
                <FavoritedItem
                  key={item.id}
                  item={item}
                  refetchFavoritos={refetchFavoritos}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
