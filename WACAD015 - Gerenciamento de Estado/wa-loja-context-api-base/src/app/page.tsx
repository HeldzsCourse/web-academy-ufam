"use client";

import { useState, createContext } from "react";
import ListagemProdutos from "./components/ListagemProdutos/ListagemProdutos";
import { mockProdutos } from "./mocks/produtos";
import { Produto } from "./types/produto";

export const FavoritosContext = createContext<{
  favoritos: Produto[];
  setFavoritos: React.Dispatch<React.SetStateAction<Produto[]>>;
}>({
  favoritos: [],
  setFavoritos: () => {},
});

export default function App() {
  const produtos = mockProdutos;
  const [favoritos, setFavoritos] = useState<Produto[]>([]);

  return (
    <main>
      <div className="container p-5">
        <FavoritosContext.Provider value={{ favoritos, setFavoritos }}>
          <ListagemProdutos produtos={produtos} />
        </FavoritosContext.Provider>
      </div>
    </main>
  );
}
