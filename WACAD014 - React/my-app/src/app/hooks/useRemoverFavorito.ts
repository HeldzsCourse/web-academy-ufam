import { useMutation } from "@tanstack/react-query";
import { removeProdutoFavorito } from "../services/favoritos";

export function useRemoverFavorito(onSuccess: () => void, onError: () => void) {
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => removeProdutoFavorito(id),
    onSuccess,
    onError,
  });

  return { removerFavorito: mutate, isPending };
}
