import { Request, Response } from "express";
import * as PurchaseService from "./purchases.service";
import { AddToCartInput } from "./purchases.types";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export const addToCart = (req: Request, res: Response) => {
  try {
    const input = req.body as AddToCartInput;
    const updatedCart = PurchaseService.addToCart(req, input);

    res.status(StatusCodes.CREATED).json({
      message: "Item adicionado/atualizado no carrinho.",
      cart: updatedCart,
    });
  } catch (error: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

export const checkout = async (req: Request, res: Response) => {
  try {
    const newPurchase = await PurchaseService.checkout(req);

    res.status(StatusCodes.CREATED).json({
      message: "Compra concluída com sucesso!",
      purchase: newPurchase,
    });
  } catch (error: any) {
    if (
      error.message === "O carrinho está vazio." ||
      error.message === "Usuário não autenticado. Faça login para continuar."
    ) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }

    console.error("Erro no checkout:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error:
        "Falha ao processar a compra. Talvez tenha trocado number por string.",
    });
  }
};

export const getCart = (req: Request, res: Response) => {
  const cart = req.session.cart || [];
  res.status(StatusCodes.OK).json(cart);
};
