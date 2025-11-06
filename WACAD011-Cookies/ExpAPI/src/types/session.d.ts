import { CartItem } from "../resources/purchases/purchases.types";

export declare module "express-session" {
  interface SessionData {
    uid: string;
    userTypeId: string;
    cart: CartItem[];
  }
}
