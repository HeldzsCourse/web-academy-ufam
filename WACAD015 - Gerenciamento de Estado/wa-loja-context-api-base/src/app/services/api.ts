import axios from "axios";

export const apiFavoritos = axios.create({
  baseURL: "https://favoritos-context-api-json-server-z.vercel.app",
});
