export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  userType: string;
}

export type CreateUserDTO = Pick<User, "name" | "email" | "password">;

export type UpdateUserDTO = Partial<CreateUserDTO> & Pick<User, "id">;

export type UserDTO = Omit<User, "password">;
