"use client";

import { useRemoverFavorito } from "@/app/hooks/useRemoverFavorito";
import { ItemFavoritoType } from "@/app/types/ItemFavorito.types";
import React from "react";
import { toast } from "react-toastify";

interface FavoritedItemProps {
  item: ItemFavoritoType;
  refetchFavoritos: () => void;
}

export default function FavoritedItem({
  item,
  refetchFavoritos,
}: FavoritedItemProps) {
  const { removerFavorito, isPending } = useRemoverFavorito(
    () => {
      toast.success("Produto removido dos favoritos com sucesso!");
      refetchFavoritos();
    },
    () => toast.error("Ocorreu um erro ao remover o produto dos favoritos.")
  );

  return (
    <tr key={item.id}>
      <td>{item.nome}</td>
      <td>R$ {item.preco}</td>
      <td>
        <button
          onClick={() => {
            removerFavorito(item.id);
          }}
          className="btn btn-danger btn-sm"
        >
          {isPending ? "Removendo..." : "Remover"}
        </button>
      </td>
    </tr>
  );
}
