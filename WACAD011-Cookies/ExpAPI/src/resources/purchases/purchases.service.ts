import { Request } from "express";
import { PrismaClient } from "../../generated/client";
import { AddToCartInput, CartItem } from "./purchases.types";

const prisma = new PrismaClient();

export const addToCart = (req: Request, input: AddToCartInput): CartItem[] => {
  if (!req.session.cart) {
    req.session.cart = [];
  }

  const cart: CartItem[] = req.session.cart;
  const { productId, quantity } = input;

  const existingItemIndex = cart.findIndex(
    (item) => item.productId === productId
  );

  if (existingItemIndex > -1) {
    const existingItem = cart[existingItemIndex];

    if (existingItem) {
      existingItem.quantity = quantity;
    }
  } else {
    cart.push({ productId, quantity });
  }

  req.session.cart = cart;

  return cart;
};

export const checkout = async (req: Request) => {
  const cart = req.session.cart;
  const userId = req.session.uid;

  if (!userId) {
    throw new Error("Usuário não autenticado. Faça login para continuar.");
  }

  if (!cart || cart.length === 0) {
    throw new Error("O carrinho está vazio.");
  }

  const newPurchase = await prisma.purchase.create({
    data: {
      userId: userId,
      items: {
        createMany: {
          data: cart.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  req.session.cart = [];

  return newPurchase;
};
