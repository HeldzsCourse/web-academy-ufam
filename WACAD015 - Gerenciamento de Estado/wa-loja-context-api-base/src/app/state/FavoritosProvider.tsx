"use client";

import React, { createContext, useContext, useState } from "react";
import { Produto } from "../types/produto";

export const FavoritosContext = createContext<{
  favoritos: Produto[];
  setFavoritos: React.Dispatch<React.SetStateAction<Produto[]>>;
  verificarFavorito: (id: string) => boolean;
  removerFavorito: (id: string) => void;
  adicionarFavorito: (produto: Produto) => void;
  precoTotalFavoritos: number;
}>({
  favoritos: [],
  setFavoritos: () => {},
  verificarFavorito: () => false,
  removerFavorito: () => {},
  adicionarFavorito: () => {},
  precoTotalFavoritos: 0,
});

export const FavoritosProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [favoritos, setFavoritos] = useState<Produto[]>([]);

  // Verifica se um produto está nos favoritos e retorna true ou false
  const verificarFavorito = (id: string) => {
    return favoritos.some((produto) => produto.id === id);
  };

  // Remove um produto dos favoritos
  const removerFavorito = (id: string) => {
    const novosFavoritos = favoritos.filter((produto) => produto.id !== id);
    setFavoritos(novosFavoritos);
  };

  // Adiciona um produto aos favoritos
  const adicionarFavorito = (produto: Produto) => {
    const novosFavoritos = [...favoritos, produto];
    setFavoritos(novosFavoritos);
  };

  // Retorna o preço total dos produtos favoritos
  const precoTotalFavoritos = favoritos.reduce((acc, produto) => {
    return acc + Number(produto.preco);
  }, 0);

  return (
    <FavoritosContext.Provider
      value={{
        favoritos,
        setFavoritos,
        verificarFavorito,
        removerFavorito,
        adicionarFavorito,
        precoTotalFavoritos,
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
