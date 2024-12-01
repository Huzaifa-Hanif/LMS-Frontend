// // 'use server';\

// import { currentUser } from "@clerk/nextjs/server";

// import prisma from '../../lib/prisma'; // Adjust the import path as needed


// // connectmongoDB();


// export const saveAndGetCurrentUser = async () => {

//     try {

//         const authenticatedUser = await currentUser();
//         console.log(authenticatedUser,"authenticatedUser")
        
//         const isUserAlreadyExists = await prisma.user.findUnique({
//             where: {
//                 email: authenticatedUser?.emailAddresses[0]?.emailAddress || '',
//             },
//         });
//         if(isUserAlreadyExists) {

//             return {
//                 success: true,
//                 data: JSON.parse(JSON.stringify(isUserAlreadyExists))
//             }

//         }

//         const newUser = await prisma.user.create({
//             data: {
//                 name: (authenticatedUser?.firstName || '') + ' ' + (authenticatedUser?.lastName || ''),
//                 email: authenticatedUser?.emailAddresses[0]?.emailAddress || '',

//             },
//         });

//         return {
//             success: true,
//             data: newUser,
//         };

        
//     } catch (error: any) {
        
//         return {
//             success: false,
//             message: error.message
//         }

//     }

// }