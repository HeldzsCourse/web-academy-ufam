import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getFavoritos,
  addFavorito,
  removeFavorito,
} from "../services/favoritos";
import { Produto } from "../types/produto";

export default function useFavoritos() {
  const { data, refetch } = useQuery({
    queryKey: ["listaFavoritos"],
    queryFn: () => getFavoritos(),
  });

  const add = useMutation({
    mutationFn: (produto: Produto) => addFavorito(produto),
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => removeFavorito(id),
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return {
    favoritos: data || [],
    add,
    remove,
    refetch,
  };
}
