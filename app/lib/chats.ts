// 'use server';

// // import ChatModel from '@/models/chat-model';
// // import prisma from '../../lib/prisma.ts'; // Adjust the import path as needed
// import prisma from "../../lib/prisma"
// export const createNewChat = async (chatsFromFrontend: any) => {
// console.log(chatsFromFrontend,"chatsFromFrontend")
//   try {

//     const response = await prisma.chat.create({
//       data: {
//         title: chatsFromFrontend.title,
//         messages: chatsFromFrontend.messages,
//         user: { 
//           connect: { 
//             id: chatsFromFrontend.user 
//           } 
//         },
//       },
//     });
//    console.log(response,"reesss")
//     return {
//       success: true,
//       data: JSON.parse(JSON.stringify(response)),
//     };

//   } catch (error: any) {
//     console.log(error,"rrrrrr")
//     return {
//       success: false,
//       message: error?.message,
//     };
//   }
// };


// export const getAllChatsByUserId = async (userId: string) => {
//   try {
//     const response = await prisma.chat.findMany({
//       where: { userId },
//       orderBy: { createdAt: 'desc' }, 
//     });
//     return {
//       success: true,
//       data: response,
//     };
//   } catch (error: any) {
//     return {
//       success: false,
//       message: error?.message,
//     };
//   }
// };

// export const updateChat = async ({
//   chatId,
//   messagesArray,
// }: {
//   chatId: string;
//   messagesArray: any[];
// }) => {
//   try {
//     // Ensure the chatId is a string if you're using UUIDs or an integer if you're using auto-increment IDs
//     const response = await prisma.chat.update({
//       where: { id: chatId },
//       data: { messages: messagesArray },
//     });

//     return {
//       success: true,
//       data: response,
//     };
//   } catch (error: any) {
//     return {
//       success: false,
//       message: error?.message,
//     };
//   }
// };
// export const deleteChat = async (chatId: string) => {
//   try {
//     await prisma.chat.delete({
//       where: { id: chatId },
//     });

//     return {
//       success: true,
//       data: 'chat deleted successfully',
//     };
//   } catch (error: any) {
//     return {
//       success: false,
//       message: error?.message,
//     };
//   }
// };
