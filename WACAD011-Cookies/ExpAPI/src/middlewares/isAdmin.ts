import { Request, Response, NextFunction } from "express";
import { UserTypes } from "../resources/userType/userType.constants";
import { StatusCodes } from "http-status-codes";

function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.session.userTypeId !== UserTypes.ADMIN) {
    res
      .status(StatusCodes.FORBIDDEN)
      .json({ message: "Acess denied. Admins only." });
  } else {
    next();
  }
}

export default isAdmin;
