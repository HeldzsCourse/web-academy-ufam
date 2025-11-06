import { Login } from "./auth.types";
import { getUserByEmail } from "../users/users.service";
import bcrypt from "bcryptjs";

export async function checkCredentials(credentials: Login) {
  const user = await getUserByEmail(credentials.email);

  if (!user) {
    return null;
  }

  const ok = await bcrypt.compare(credentials.password, user.password);

  return ok ? user : null;
}
