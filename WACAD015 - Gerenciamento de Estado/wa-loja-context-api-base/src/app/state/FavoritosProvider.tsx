"use client";

import React, { createContext, useState } from "react";
import { Produto } from "../types/produto";

export const FavoritosContext = createContext<{
  favoritos: Produto[];
  setFavoritos: React.Dispatch<React.SetStateAction<Produto[]>>;
}>({
  favoritos: [],
  setFavoritos: () => {},
});

const FavoritosProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [favoritos, setFavoritos] = useState<Produto[]>([]);

  return (
    <FavoritosContext.Provider value={{ favoritos, setFavoritos }}>
      {children}
    </FavoritosContext.Provider>
  );
};

export default FavoritosProvider;
