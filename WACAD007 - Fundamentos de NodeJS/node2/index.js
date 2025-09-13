import http from "http";
import fs from "fs";
import path_module from "path";
import dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
import util from "./util.js";

const port = process.env.PORT ?? 3333;
const path = process.argv[2] ?? ".";

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    const arq = fs.readdir(path, (err, arquivos) => {
      if (err) throw err;

      res.writeHead(200, { "content-type": "text/html;charset=utf-8" });
      arquivos.map((arquivo) => res.write(util.createLink(arquivo)));
      res.end();
    });
  } else {
    const reqFile = req.url.slice(1);
    const filePath = path_module.join(path, reqFile);

    fs.readFile(filePath, (err, data) => {
      if (err) throw err;

      res.writeHead(200, { "content-Type": "text/html;charset=utf-8" });
      res.end(data);
    });
  }
});

server.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}/`);
});
