import { useMutation } from "@tanstack/react-query";
import { addProdutoFavorito } from "../services/favoritos";
import { ProdutoType } from "../types/Produto.types";

export function useAddFavorito(onSuccess: () => void, onError: () => void) {
  const { mutate, isPending } = useMutation({
    mutationFn: (produto: ProdutoType) => addProdutoFavorito(produto),
    onSuccess,
    onError,
  });

  return { addFavorito: mutate, isPending };
}
