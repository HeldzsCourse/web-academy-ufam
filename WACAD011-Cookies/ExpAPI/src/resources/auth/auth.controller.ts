import { Request, Response } from "express";
import { createUser, getUserByEmail } from "../users/users.service";
import { StatusCodes } from "http-status-codes";
import { SignUp } from "./auth.types";
import { UserTypes } from "../userType/userType.constants";

const signup = async (req: Request, res: Response) => {
  try {
    const user = req.body as SignUp;

    if (!(await getUserByEmail(user.email))) {
      const newUser = await createUser({
        ...user,
        userTypeId: UserTypes.USER,
      });
      res.status(StatusCodes.CREATED).json(newUser);
    } else {
      res
        .status(StatusCodes.CONFLICT)
        .json({ message: "User with this email already exists!" });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
const login = (req: Request, res: Response) => {};
const logout = (req: Request, res: Response) => {};

export default { signup, login, logout };
