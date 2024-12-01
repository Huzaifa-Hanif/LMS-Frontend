import bcrypt from "bcrypt";
import crypto from "crypto";
import { NextResponse } from "next/server";

// import prisma from '@/app/libs/prismaDb';
// import sendEmail from '@/app/utils/sendEmail';
import { PrismaClient } from "@prisma/client";
import sendEmail from "@/app/utils/sendEmail";
// import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, fullName, password } = body;
    if (!email || !fullName || !password) {
      return NextResponse.json("Missing info", { status: 400 });
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      // User already exists, handle accordingly
      return NextResponse.json("User already exists with this email", {
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const token = crypto.randomBytes(32).toString("hex");
    const tokenExpiration = new Date(
      new Date().getTime() + 30 * 24 * 60 * 60000
    ); // 60000 milliseconds in a minute

    console.log(token, "tokeeen");
    await prisma.user.create({
      data: {
        email,
        name: fullName,
        password: hashedPassword,
        resetToken: token,
        resetTokenExpiry: tokenExpiration,
      },
    });

    // Send email
    const link = `${process.env.APP_URL}/auth?token=${token}`;
    sendEmail(email, "Email confirmation", link);

    return NextResponse.json(
      `Confirmation link is sent to ${email}. Please check your email!`,
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error, "REGISTRATION ERROR");
    return NextResponse.json("Internal Error", { status: 500 });
  }
}

// // src/pages/api/auth/register.ts
// import type { NextApiRequest, NextApiResponse } from 'next';
// // import bcrypt from 'bcrypt';
// import bcrypt from "bcrypt"  ;

// import { PrismaClient } from '@prisma/client';
// import { NextRequest, NextResponse } from 'next/server';

// const prisma = new PrismaClient();

// export async function POST(req: NextRequest) {
//   try {
//     const { name, email, password, picture } = await req.json();

//     if (!email || !password) {
//       return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
//     }

//     // Check if the user already exists
//     const existingUser = await prisma.user.findUnique({ where: { email } });

//     if (existingUser) {
//       return NextResponse.json({ message: 'User already exists' }, { status: 409 });
//     }

//     // Hash the password
//     // const hashedPassword = await bcrypt.hash(password, 10);

//     // Create the user
//     const hashedPassword = await bcrypt.hash(password, 12);

//     const newUser = await prisma.user.create({
//       data: {
//         name,
//         email,
//         password: password,
//         picture,
//         // userType: 'STUDENT', // Default userType
//       },
//     });

//     return NextResponse.json({ message: 'User registered successfully', user: newUser }, { status: 201 });
//   } catch (error: any) {
//     return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
//   } finally {
//     await prisma.$disconnect();
//   }

// }
