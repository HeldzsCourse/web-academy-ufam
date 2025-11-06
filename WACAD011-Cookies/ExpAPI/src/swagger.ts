import swaggerAutoGen from "swagger-autogen";
import dotenv from "dotenv";

dotenv.config();

const doc = {
  info: {
    title: "API da Loja Virtual",
    description: "Documentação da API da Loja Virtual",
  },
  host: `localhost:${process.env.PORT || 3333}`,
  schemes: ["http"],
  tags: [
    {
      name: "Auth",
      description: "Autenticação de usuários",
    },
    {
      name: "User",
      description: "Operações relacionadas a usuários",
    },
    {
      name: "Product",
      description: "Operações relacionadas a produtos",
    },
    {
      name: "Cart",
      description: "Operações relacionadas ao carrinho de compras",
    },
    {
      name: "Language",
      description: "Operações relacionadas a idiomas",
    },
  ],
  definitions: {
    CreateProductDto: {
      name: "Modern Soft Sausages",
      price: 2699.0,
      stockQuantity: 9,
    },
    Product: {
      id: "8a2053de-5d92-4c43-97c0-c9b2b0d56703",
      name: "Modern Soft Sausages",
      price: 2699.0,
      stockQuantity: 9,
      createdAt: "2023-11-07T19:27:15.645Z",
      updatedAt: "2023-11-07T19:27:15.645Z",
    },
  },
};

const outputFile = "./swagger-output.json";
const routes = ["./src/router/index.ts"];

swaggerAutoGen(outputFile, routes, doc);
