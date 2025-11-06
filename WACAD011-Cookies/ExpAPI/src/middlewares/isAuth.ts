import { Request, Response, NextFunction } from "express";
import { UserTypes } from "../resources/userType/userType.constants";
import { StatusCodes } from "http-status-codes";

function isAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session.uid) {
    res
      .status(StatusCodes.FORBIDDEN)
      .json({ message: "Acess denied. Login required." });
  } else {
    next();
  }
}

export default isAuth;
