// app/api/user/route.ts

import { NextResponse } from 'next/server';
// import { currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

const saveAndGetCurrentUser = async () => {
  try {
    // const authenticatedUser = await currentUser();
    // console.log(authenticatedUser, "authenticatedUser");

    // const isUserAlreadyExists = await prisma.user.findUnique({
    //   where: {
    //     email: authenticatedUser?.emailAddresses[0]?.emailAddress || '',
    //   },
    // });

    // if (isUserAlreadyExists) {
    //   return {
    //     success: true,
    //     data: JSON.parse(JSON.stringify(isUserAlreadyExists)),
    //   };
    // }

    // const newUser = await prisma.user.create({
    //   data: {
    //     name: (authenticatedUser?.firstName || '') + ' ' + (authenticatedUser?.lastName || ''),
    //     email: authenticatedUser?.emailAddresses[0]?.emailAddress || '',
    //   },
    // });

    return {
      success: true,
      // data: newUser,
    };

  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export async function GET() {
  const result = await saveAndGetCurrentUser();
  if (result.success) {
    // return NextResponse.json(result.data);
  } else {
    return NextResponse.json({ message: result.message }, { status: 400 });
  }
}
