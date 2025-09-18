import http from "node:http";
import fs from "fs/promises";
import dotenv from "dotenv";
import template from "./template.js";
import { LoremIpsum } from "lorem-ipsum";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const port = process.env.PORT ?? 3000;

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
  suffix: '\n',
});

const server = http.createServer(async (req, res) => {
  let p = 0;

  if (req.url.includes("p=")) {
    p = req.url.split("p=")[1];
  }

  if (req.url === "/style.css") {
    res.writeHead(200, { "content-type": "text/css;charset=utf-8" });
    const css = await fs.readFile("./style.css");
    res.write(css);
    res.end();
    return;
  }

  res.writeHead(200, { "content-type": "text/html;charset=utf-8" });
  res.write(template(`<p>${lorem.generateParagraphs(parseInt(p))}</p>`));
  res.end();
});

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});
