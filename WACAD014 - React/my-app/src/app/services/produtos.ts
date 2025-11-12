import { api } from "./api";
import { ProdutoType } from "@/app/types/Produto.types";

export async function getListaProdutos(): Promise<ProdutoType[]> {
  return api.get("/produto").then((response) => response.data);
}
