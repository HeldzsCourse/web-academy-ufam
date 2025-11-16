import { useQuery } from "@tanstack/react-query";
import { getProduto } from "../services/produtos";

export function useInfoProduto(id: string) {
  const { data, isPending, isError } = useQuery({
    queryKey: ["produto", id],
    queryFn: () => getProduto(id),
  });

  return { produto: data, isPending, isError };
}
