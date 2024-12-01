// scripts/createSuperAdmin.ts
import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("dfdf");
  const superAdmin = await prisma.user.findUnique({
    where: { email: "superadmin@example.com" },
  });

  if (!superAdmin) {
    await prisma.user.create({
      data: {
        email: "test@gmail.com",
        name: "Super Admin",
        password: "Hello123",
        role: "SUPER_ADMIN",
      },
    });
    console.log("Super Admin created successfully");
  } else {
    console.log("Super Admin already exists");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
