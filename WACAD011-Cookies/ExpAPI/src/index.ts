import express from "express";
import router from "./router/index.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3333;

app.use(router);

app.listen(port, () => {
  console.log(`Servidor rodando na url http://localhost:${port}`);
})