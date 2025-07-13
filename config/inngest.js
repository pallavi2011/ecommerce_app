import { Inngest } from "inngest";
import { db } from "@/lib/prisma";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "electrocart-next" });

// Inngest Function to save user data to a database
export const syncUserCreation = inngest.createFunction(
    {
        id: 'sync-user-from-clerk'
    },
    { event: 'clerk/user.created' },
    async ({ event }) => {
        const { id, email_addresses, first_name, last_name, image_url } = event.data;

    await db.clerkUser.create({
      data: {
        id, // Clerk's user ID
        clerkId: id,
        email: email_addresses[0]?.email_address,
        name: [first_name, last_name].filter(Boolean).join(" "),
        imageUrl: image_url,
      }
    });
    }
)

// Inngest Function to update user data in database 
export const syncUserUpdation = inngest.createFunction(
    {
        id: 'update-user-from-clerk'
    },
    { event: 'clerk/user.updated' },
    async ({event}) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data
        const userData = {
            id: id,
            email: email_addresses[0].email_address,
            name: first_name + ' ' + last_name,
            imageUrl: image_url
        }
        
        await db.clerkUser.update({
            where: {  id },
            data: userData
        })
    }
)

// Inngest Function to delete user from database
export const syncUserDeletion = inngest.createFunction(
    {
        id: 'delete-user-with-clerk'
    },
    { event: 'clerk/user.deleted' },
    async ({event}) => {
        
        const {id } = event.data

        await db.clerkUser.delete({
            where: { id }
        })
    }
)

// Inngest Function to create user's order in database
// export const createUserOrder = inngest.createFunction(
//     {
//         id:'create-user-order',
//         batchEvents: {
//             maxSize: 5,
//             timeout: '5s'
//         }
//     },
//     {event: 'order/created'},
//     async ({events}) => {
        
//         const orders = events.map((event)=> {
//             return {
//                 userId: event.data.userId,
//                 items: event.data.items,
//                 amount: event.data.amount,
//                 address: event.data.address,
//                 date : event.data.date
//             }
//         })

        
//         await db.order.createMany({
//             data: orders
//         })

//         return { success: true, processed: orders.length };

//     }
// )