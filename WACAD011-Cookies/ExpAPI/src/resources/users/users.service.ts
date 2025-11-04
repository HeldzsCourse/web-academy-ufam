import { PrismaClient, User } from "../../generated/client";
import { CreateUserDTO, UpdateUserDTO, UserDTO } from "./users.types";
import { UserTypes } from "../userType/userType.constants";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export function getAllUsers(): Promise<User[]> {
  return prisma.user.findMany();
}

export async function createUser(createUser: CreateUserDTO): Promise<User> {
  const { password } = createUser;
  const rounds = parseInt(process.env.SALT_ROUNDS || "10");

  const salt = await bcrypt.genSalt(rounds);
  const hash = await bcrypt.hash(password, salt);

  return prisma.user.create({
    data: { ...createUser, userTypeId: UserTypes.client, password: hash },
  });
}
