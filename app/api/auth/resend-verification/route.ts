import sendEmail from "@/app/utils/sendEmail";
import { db } from "@/lib/db"; // Adjust this import according to your structure
import crypto from "crypto";
import { NextResponse } from "next/server";
// import { sendEmail } from "@/lib/sendEmail"; // Assume you have a sendEmail utility

export async function POST(request: Request) {
  const body = await request.json();
  const { email } = body;

  try {
    // Find user by email
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json("User not found", { status: 404 });
    }

    // Generate a new token and expiration date
    const token = crypto.randomBytes(32).toString("hex");
    const tokenExpiration = new Date(
      new Date().getTime() + 30 * 24 * 60 * 60000
    ); // 30 days

    // Update user's resetToken and resetTokenExpiry in the database
    await db.user.update({
      where: { id: user.id },
      data: {
        resetToken: token,
        resetTokenExpiry: tokenExpiration,
      },
    });

    // Send the new verification email
    const link = `${process.env.APP_URL}/auth?token=${token}`;
    await sendEmail(user.email, "Email Confirmation", link);

    return NextResponse.json(
      `Confirmation link has been sent to ${email}. Please check your email!`,
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error, "ERROR RESENDING EMAIL");
    return NextResponse.json("Internal Error", { status: 500 });
  }
}
