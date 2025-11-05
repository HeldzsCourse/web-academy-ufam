import { User } from "../../generated/client";

export type CreateUserDTO = Pick<
  User,
  "name" | "email" | "password" | "userTypeId"
>;

export type UpdateUserDTO = Partial<CreateUserDTO> & Pick<User, "id">;

export type UserDTO = Omit<User, "password">;
