import axios from "axios";

export const apiProdutos = axios.create({
  baseURL: "https://ranekapi.origamid.dev/json/api",
});

export const apiFavoritos = axios.create({
  baseURL: "https://favoritos-json-server-tau.vercel.app/",
});
