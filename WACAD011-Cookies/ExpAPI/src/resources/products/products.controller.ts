import { Request, Response } from "express";

const index = (req: Request, res: Response) => {
  res.json({ msg: "Hello World!" });
};
const create = (req: Request, res: Response) => {};
const read = (req: Request, res: Response) => {
  res.json({ msg: `ID: ${req.params.id}` });
};
const update = (req: Request, res: Response) => {};
const remove = (req: Request, res: Response) => {};

export default { index, create, read, update, remove };
