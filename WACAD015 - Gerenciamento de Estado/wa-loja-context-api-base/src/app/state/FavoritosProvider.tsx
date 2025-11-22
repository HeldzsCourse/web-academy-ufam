"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Produto } from "../types/produto";
import useFavoritos from "../hooks/useFavoritos";

export const FavoritosContext = createContext<{
  favoritos: Produto[];
  verificarFavorito: (id: string) => boolean;
  removerFavorito: (id: string) => void;
  adicionarFavorito: (produto: Produto) => void;
  precoTotalFavoritos: number;
}>({
  favoritos: [],
  verificarFavorito: () => false,
  removerFavorito: () => {},
  adicionarFavorito: () => {},
  precoTotalFavoritos: 0,
});

export const FavoritosProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  // const [favoritos, setFavoritos] = useState<Produto[]>([]);
  const { favoritos, add, remove, refetch } = useFavoritos();

  // useEffect(() => {
  //   fetch("https://favoritos-context-api-json-server-z.vercel.app/favoritos")
  //     .then((response) => response.json())
  //     .then((favoritos) => {
  //       setFavoritos(favoritos);
  //     });
  // }, []);

  // Verifica se um produto está nos favoritos e retorna true ou false
  const verificarFavorito = (id: string) => {
    return favoritos.some((produto) => produto.id === id);
  };

  // Remove um produto dos favoritos
  const removerFavorito = (id: string) => {
    remove.mutate(id);
  };

  // Adiciona um produto aos favoritos
  const adicionarFavorito = (produto: Produto) => {
    add.mutate(produto);
  };

  // Retorna o preço total dos produtos favoritos
  const precoTotalFavoritos = favoritos.reduce((acc, produto) => {
    return acc + Number(produto.preco);
  }, 0);

  return (
    <FavoritosContext.Provider
      value={{
        favoritos,
        precoTotalFavoritos,
        adicionarFavorito,
        removerFavorito,
        verificarFavorito,
      }}
    >
      {children}
    </FavoritosContext.Provider>
  );
};

export const useFavoritosContext = () => {
  const favoritosContext = useContext(FavoritosContext);

  return favoritosContext;
};
