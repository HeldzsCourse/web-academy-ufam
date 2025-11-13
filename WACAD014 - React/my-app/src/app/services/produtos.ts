import { apiProdutos } from "./api";
import { ProdutoType } from "@/app/types/Produto.types";

export async function getListaProduto(): Promise<ProdutoType[]> {
  return apiProdutos.get("/produto").then((response) => response.data);
}
