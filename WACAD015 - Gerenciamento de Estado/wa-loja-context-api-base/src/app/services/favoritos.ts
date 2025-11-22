import { Produto } from "../types/produto";
import { apiFavoritos } from "./api";

export async function getFavoritos(): Promise<Produto[]> {
  const response = await apiFavoritos.get("/favoritos");
  return response.data;
}

export async function addFavorito(produto: Produto) {
  const response = await apiFavoritos.post<Produto>("/favoritos", produto);
  return response.data;
}

export async function removeFavorito(id: string) {
  await apiFavoritos.delete(`/favoritos/${id}`);
}
