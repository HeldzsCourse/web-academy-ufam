import { Request, Response } from "express";
import axios from "axios";
import { Product } from "../types/product";

axios.defaults.baseURL = `http://localhost:8000`;

const index = async (req: Request, res: Response) => {
  try {
    const product = (await axios.get("/product")).data;

    res.render("product/index", { product });
  } catch (error) {
    res.status(500).send("Error retrieving products");
  }
};
const create = async (req: Request, res: Response) => {
  try {
    if (req.method === "GET") {
      res.render("product/create");
    } else if (req.method === "POST") {
      const product: Product = req.body;
      await axios.post("/product", product);
      res.redirect("/product");
    }
  } catch (error) {
    res.statusCode = 500;
    res.send(error);
  }
};
const read = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product: Product = (await axios.get(`/product/${id}`)).data;
    res.render("product/read", { product });
  } catch (error) {
    res.statusCode = 500;
    res.send(error);
  }
};
const update = async (req: Request, res: Response) => {
  try {
    if (req.method === "GET") {
      const { id } = req.params;
      const product: Product = (await axios.get(`/product/${id}`)).data;
      res.render("product/update", { product });
    } else if (req.method === "POST") {
      const { id } = req.params;
      const product: Product = req.body;
      await axios.put(`/product/${id}`, product);
      res.redirect("/product");
    }
  } catch (error) {
    res.statusCode = 500;
    res.send(error);
  }
};
const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await axios.delete(`/product/${id}`);
    res.redirect("/product");
  } catch (error) {
    res.statusCode = 500;
    res.send(error);
  }
};

export default { index, create, read, update, remove };
