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
    data: { ...createUser, password: hash },
  });
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { email: email },
    select: {
      id: true,
      name: true,
      email: true,
      userTypeId: true,
      password: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function getUserById(id: string): Promise<UserDTO | null> {
  return prisma.user.findUnique({
    where: { id: id },
    select: {
      id: true,
      name: true,
      email: true,
      userTypeId: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function updateUser(
  updateUser: UpdateUserDTO,
  id: string
): Promise<User | null> {
  const { password } = updateUser;

  if (password) {
    const rounds = parseInt(process.env.SALT_ROUNDS || "10");
    const salt = await bcrypt.genSalt(rounds);
    const hash = await bcrypt.hash(password, salt);
    updateUser.password = hash;
  }

  return prisma.user.update({
    where: { id: id },
    data: updateUser,
  });
}

export async function deleteUser(id: string): Promise<User | null> {
  return prisma.user.delete({
    where: { id: id },
  });
}
