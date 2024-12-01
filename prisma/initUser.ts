// prisma/initUser.ts
// import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createDefaultTeacherUser() {
  const teacherEmail = "default_teacher@example.com";
  const existingTeacher = await prisma.user.findUnique({
    where: { email: teacherEmail },
  });
  console.log(existingTeacher, "dfdfd");
  if (!existingTeacher) {
    // const hashedPassword = await bcrypt.hash("defaultPassword123", 12);
    await prisma.user.create({
      data: {
        email: teacherEmail,
        name: "Default Teacher",
        password: "defaultPassword123",
        userType: "TEACHER",
      },
    });
    console.log("Default teacher user created.");
  } else {
    console.log("Default teacher user already exists.");
  }
}
