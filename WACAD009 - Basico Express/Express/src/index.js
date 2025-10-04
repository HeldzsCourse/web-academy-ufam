const express = require("express");
require("dotenv").config();

const server = express();
const PORT = process.env.PORT ?? 3333;

server.get("/", (req, res) => {
  res.send("Hello World!");
});

server.listen(PORT, () => {
  console.log(`Express server iniciado na url http://localhost:${PORT}`);
})