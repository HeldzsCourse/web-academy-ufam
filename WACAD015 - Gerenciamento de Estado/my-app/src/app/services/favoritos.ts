import { ProdutoType } from "../types/Produto.types";
import { apiFavoritos } from "./api";

export async function addProdutoFavorito(produto: ProdutoType) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return apiFavoritos
    .post<ProdutoType>("/favoritos", produto)
    .then((response) => response.data);
}

export async function removeProdutoFavorito(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return apiFavoritos
    .delete<ProdutoType>(`/favoritos/${id}`)
    .then((response) => response.data);
}

export async function getListaFavoritos(): Promise<ProdutoType[]> {
  return apiFavoritos.get("/favoritos").then((response) => response.data);
}
