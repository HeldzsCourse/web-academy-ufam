import Joi from "joi";
import { UserTypes } from "../userType/userType.constants";

const userSchema = Joi.object().keys({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  userTypeId: Joi.string()
    .valid(...Object.values(UserTypes))
    .required(),
});

export default userSchema;
