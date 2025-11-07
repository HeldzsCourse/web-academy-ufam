import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  createUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  updateUser,
  deleteUser,
} from "./users.service";
import { CreateUserDTO, UpdateUserDTO } from "./users.types";

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
const read = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const user = await getUserById(id);

    res.status(StatusCodes.OK).json(user);
  } catch (error: any) {
    console.log(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
  }
};
const update = (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const newData = req.body as UpdateUserDTO;

    const user = updateUser(newData, id);

    res.status(StatusCodes.OK).json(user);
  } catch (error: any) {
    console.log(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
  }
};
const remove = (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const user = deleteUser(id);

    res.status(StatusCodes.OK).json(user);
  } catch (error: any) {
    console.log(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
  }
};

export default { index, create, read, update, remove };
