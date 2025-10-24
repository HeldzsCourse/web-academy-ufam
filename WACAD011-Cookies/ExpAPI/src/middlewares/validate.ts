import { Request, Response, NextFunction } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Schema } from "joi";

function validate(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ReasonPhrases.BAD_REQUEST);
    } else {
      next();
    }
  };
}

export default validate;
