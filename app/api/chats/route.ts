// import { auth } from "@clerk/nextjs";
// import { db } from '@/app/libs/db';
// import { FetchUserData } from '@/lib/fetchUserData';
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
// import { db } from "@/lib/db"; // Your database setup

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userIdQuery = searchParams.get("userId");
    // console.log(userIdQuery, 'Searchh paraaam');
    if (!userIdQuery) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    return await getChats(req);
  } catch (error) {
    console.error("[CHATS] Error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // const user = await req.json();
    // console.log(user, 'searchhh parammmmm22342343434');
    // const userIdQuery = searchParams.get('userId');
    // if (!userIdQuery) {
    //   return new NextResponse('Unauthorized', { status: 401 });
    // }
    return await createChat(req);
  } catch (error) {
    console.error("[CHATS] Error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    // const { searchParams } = new URL(req.url);
    // const userIdQuery = searchParams.get('userId');
    // if (!userIdQuery) {
    //   return new NextResponse('Unauthorized', { status: 401 });
    // }
    return await updateChat(req);
  } catch (error) {
    console.error("[CHATS] Error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    // if (!user) {
    //   return new NextResponse('Unauthorized', { status: 401 });
    // }
    return await deleteChat(req);
  } catch (error) {
    console.error("[CHATS] Error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

async function createChat(req: Request) {
  const { title, messages, user } = await req.json();
  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const chat = await db.chat.create({
    data: {
      title,
      messages,
      user: {
        connect: { id: user },
      },
    },
  });

  return NextResponse.json({ success: true, data: chat });
}

async function getChats(req: Request) {
  const { searchParams } = new URL(req.url);
  const userIdQuery = searchParams.get("userId");
  if (!userIdQuery) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const chats = await db.chat.findMany({
    where: { userId: userIdQuery },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ success: true, data: chats });
}

async function updateChat(req: Request) {
  const { chatId, messagesArray } = await req.json();
  if (!chatId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const updatedChat = await db.chat.update({
    where: { id: chatId },
    data: { messages: messagesArray },
  });

  return NextResponse.json({ success: true, data: updatedChat });
}

async function deleteChat(req: Request) {
  const { chatId } = await req.json();
  await db.chat.delete({
    where: { id: chatId },
  });

  return NextResponse.json({
    success: true,
    message: "Chat deleted successfully",
  });
}
