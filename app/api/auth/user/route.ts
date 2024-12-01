import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, oldPassword, newPassword, name, email, image } = body;

    if (!id) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    // Initialize the data object for updating
    const dataToUpdate: any = {};

    // Handle password change logic
    if (newPassword) {
      if (!oldPassword) {
        return NextResponse.json(
          { message: "Old password is required" },
          { status: 400 }
        );
      }

      // Fetch user from DB
      const user = await prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }

      // If user has a password, validate old password
      if (user.password) {
        const isOldPasswordValid = await bcrypt.compare(
          oldPassword,
          user.password
        );
        if (!isOldPasswordValid) {
          return NextResponse.json(
            { message: "Old password is incorrect" },
            { status: 400 }
          );
        }
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Add password to the update object
      dataToUpdate.password = hashedPassword;
    }

    // Handle other fields like name, email (only if they are provided)
    if (name) {
      dataToUpdate.name = name;
    }
    if (email) {
      dataToUpdate.email = email;
    }
    if (image) {
      dataToUpdate.image = image; // Update image if provided
    }

    // Update user data
    const updatedUser = await prisma.user.update({
      where: { id },
      data: dataToUpdate, // Pass only the fields you want to update
    });

    return NextResponse.json(
      { message: "User updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Failed to update user", error: error.message },
      { status: 500 }
    );
  }
}

// import { NextRequest, NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcryptjs";

// const prisma = new PrismaClient();

// export async function PUT(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { id, oldPassword, newPassword } = body;

//     if (!id) {
//       return NextResponse.json(
//         { message: "User ID is required" },
//         { status: 400 }
//       );
//     }

//     if (!newPassword) {
//       return NextResponse.json(
//         { message: "New password is required" },
//         { status: 400 }
//       );
//     }

//     // Fetch user from DB
//     const user = await prisma.user.findUnique({
//       where: { id },
//     });

//     if (!user) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }

//     // If user already has a password, validate old password
//     if (user.password) {
//       if (!oldPassword) {
//         return NextResponse.json(
//           { message: "Old password is required" },
//           { status: 400 }
//         );
//       }

//       const isOldPasswordValid = await bcrypt.compare(
//         oldPassword,
//         user.password
//       );
//       if (!isOldPasswordValid) {
//         return NextResponse.json(
//           { message: "Old password is incorrect" },
//           { status: 400 }
//         );
//       }
//     }

//     // Hash new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     // Update user password
//     const updatedUser = await prisma.user.update({
//       where: { id },
//       data: { password: hashedPassword },
//     });

//     return NextResponse.json(
//       { message: "Password updated successfully", user: updatedUser },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error updating password:", error);
//     return NextResponse.json(
//       { message: "Failed to update password", error: error.message },
//       { status: 500 }
//     );
//   }
// }
