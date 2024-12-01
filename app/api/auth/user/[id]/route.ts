// app/api/user/[id]/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  try {
    // Database query to find the user by id
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    // Check if the user has a password
    if (user && user.password) {
      return NextResponse.json({ hasPassword: true });
    } else {
      return NextResponse.json({ hasPassword: false });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
