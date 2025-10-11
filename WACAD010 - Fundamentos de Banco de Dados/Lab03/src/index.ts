import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// CREATE
async function createProduto(data: {
  modelo: string;
  fabricante?: string;
  preco_base: string | number;
  qtd_disponivel: number;
  id_categoria: number;
}) {
  const { id_categoria, ...restoDosDados } = data;

  const produto = await prisma.produto.create({
    data: {
      ...restoDosDados,
      categoria: {
        connect: { id_categoria: id_categoria },
      },
    },
    include: { categoria: true },
  });
  console.log("Produto criado com sucesso:", produto);
  return produto;
}

// READ (Ler todos)
async function getAllProdutos() {
  const produtos = await prisma.produto.findMany({
    include: {
      categoria: {
        select: { nome: true },
      },
    },
  });
  console.log("Todos os produtos encontrados:", produtos);
  return produtos;
}

// READ (Ler por ID)
async function getProdutoById(id: number) {
  const produto = await prisma.produto.findUnique({
    where: { id_produto: id },
    include: { categoria: true },
  });

  if (produto) {
    console.log("Produto encontrado:", produto);
  } else {
    console.log(`Nenhum produto encontrado com o ID: ${id}`);
  }
  return produto;
}

// UPDATE
async function updateProduto(
  id: number,
  data: {
    modelo?: string;
    fabricante?: string;
    preco_base?: string | number;
    qtd_disponivel?: number;
    id_categoria?: number;
  }
) {
  const { id_categoria, ...restoDosDados } = data;

  const produto = await prisma.produto.update({
    where: { id_produto: id },
    data: {
      ...restoDosDados,
      ...(id_categoria && {
        categoria: {
          connect: { id_categoria: id_categoria },
        },
      }),
    },
    include: { categoria: true },
  });
  console.log("Produto atualizado com sucesso:", produto);
  return produto;
}

// --- DELETE ---
async function deleteProduto(id: number) {
  const produto = await prisma.produto.delete({
    where: { id_produto: id },
  });
  console.log("Produto deletado com sucesso:", produto);
  return produto;
}

async function main() {
  try {
    console.log("\n-- CREATE --");
    const novoProduto = await createProduto({
      modelo: "Teclado Mecânico Gamer",
      fabricante: "Redragon",
      preco_base: "349.90",
      qtd_disponivel: 50,
      id_categoria: 1,
    });
    const produtoId = novoProduto.id_produto;

    console.log("\n-- READ --");
    await getProdutoById(produtoId);
    await getAllProdutos();

    console.log("\n-- UPDATE --");
    await updateProduto(produtoId, {
      preco_base: "320.50",
    });
    console.log("-- Verificação da atualização --");
    await getProdutoById(produtoId);

    console.log("\n-- DELETE --");
    await deleteProduto(produtoId);
    console.log("-- Verificação da exclusão --");
    await getProdutoById(produtoId);
  } catch (error) {
    console.error("Ocorreu um erro durante a execução:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
