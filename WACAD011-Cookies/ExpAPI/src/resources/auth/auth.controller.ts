import { Request, Response } from "express";
import { createUser, getUserByEmail } from "../users/users.service";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Login, SignUp } from "./auth.types";
import { UserTypes } from "../userType/userType.constants";
import { checkCredentials } from "./auth.service";

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
const login = async (req: Request, res: Response) => {
  try {
    const credentials = req.body as Login;
    const user = await checkCredentials(credentials);

    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid email or password" });
    } else {
      req.session.uid = user.id;
      req.session.userTypeId = user.userTypeId;

      res.status(StatusCodes.OK).json(ReasonPhrases.OK);
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
const logout = (req: Request, res: Response) => {
  req.session.destroy((error) => {
    if (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    } else {
      res.status(StatusCodes.OK).json(ReasonPhrases.OK);
    }
  });
  res.clearCookie("connect.sid");
};

export default { signup, login, logout };
