import bcrypt from "bcrypt";

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createDefaultTeacherUser() {
  const teacherEmail = "test@gmail.com";
  const existingTeacher = await prisma.user.findUnique({
    where: { email: teacherEmail },
  });
  const password = "Hello123";
  const hashedPassword = await bcrypt.hash(password, 12);

  if (!existingTeacher) {
    await prisma.user.create({
      data: {
        email: teacherEmail,
        name: "Teacher",
        password: hashedPassword,
        userType: "TEACHER",
        emailVerified: true,
        role: "TEACHER",
      },
    });
    console.log("Default teacher user created.");
  } else {
    console.log("Default teacher user already exists.");
  }
}

// Define the GET method as a named export
export async function GET() {
  try {
    await createDefaultTeacherUser();
    return NextResponse.json({ message: "Teacher user initialized." });
  } catch (error) {
    console.error("Error initializing teacher user:", error);
    return NextResponse.json(
      { message: "Error initializing teacher user." },
      { status: 500 }
    );
  }
}
