import { apiProdutos } from "./api";
import { ProdutoType } from "@/app/types/Produto.types";

export async function getListaProduto(): Promise<ProdutoType[]> {
  return apiProdutos.get("/produto").then((response) => response.data);
}

export async function getProduto(id: string): Promise<ProdutoType> {
  return apiProdutos.get(`/produto/${id}`).then((response) => response.data);
}
