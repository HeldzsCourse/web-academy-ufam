import express, { Request, Response } from "express";
import { engine } from "express-handlebars";
import dotenv from "dotenv";

import productRouter from "./router/product";
import router from "./router/router";
import { accessLog } from "./middleware/accessLog";
import validateEnv from "./utils/validateEnv";

dotenv.config();
validateEnv();

const PORT = process.env.PORT ?? 3000;
const app = express();
const publicPath = `${__dirname}/../public`;

app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", engine({
  layoutsDir: `${__dirname}/views/layouts`,
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  helpers: require(`${__dirname}/views/helpers/helpers.ts`),
}));
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

app.use(accessLog("detailed"));

app.use(productRouter);
app.use(router);

app.listen(PORT, () => {
  console.log(`Servidor rodando na url http://localhost:${PORT}`);
});
