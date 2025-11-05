import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createUser, getAllUsers, getUserByEmail } from "./users.service";
import { CreateUserDTO } from "./users.types";

const index = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();

    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
const create = async (req: Request, res: Response) => {
  try {
    const user = req.body as CreateUserDTO;

    if (!(await getUserByEmail(user.email))) {
      const newUser = await createUser(user);
      res.status(StatusCodes.CREATED).json(newUser);
    } else {
      res
        .status(StatusCodes.CONFLICT)
        .json({ message: "User with this email already exists!" });
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
const read = (req: Request, res: Response) => {};
const update = (req: Request, res: Response) => {};
const remove = (req: Request, res: Response) => {};

export default { index, create, read, update, remove };
