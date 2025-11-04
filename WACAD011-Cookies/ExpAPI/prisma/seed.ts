import { PrismaClient } from "../src/generated/client";
import { UserTypes } from "../src/resources/userType/userType.constants.js";

const prisma = new PrismaClient();

async function main() {
  return await prisma.userType.createMany({
    data: [
      { id: UserTypes.ADMIN, label: "admin" },
      { id: UserTypes.USER, label: "client" },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
