import { PrismaClient, Product } from "../../generated/client";
import { CreateProductDTO } from "./products.types";

const prisma = new PrismaClient();

export function createProduct(
  createProduct: CreateProductDTO
): Promise<Product> {
  return prisma.product.create({ data: createProduct });
}

export function getProductById(id: string): Promise<Product | null> {
  return prisma.product.findUnique({ where: { id: id } });
}

export function getAllProducts(): Promise<Product[]> {
  return prisma.product.findMany();
}

export function productAlreadyExists(name: string): Promise<Product | null> {
  return prisma.product.findFirst({ where: { name: name } });
}
