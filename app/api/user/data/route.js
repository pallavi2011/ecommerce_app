
import {db} from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET(request) {
    
    try {
        
        const { userId } = getAuth(request)
        const user = await db.clerkUser.findUnique({
            where:{
                id: userId
            },
            include:{
                cartItems: true
            }
        })

        const cartItemsObj = {};
            user.cartItems.forEach(item => {
            cartItemsObj[item.productId] = item.quantity;
            });

        if (!user) {
            return NextResponse.json({ success: false, message: "User Not Found" })
        }

        return NextResponse.json({
            success: true,
            user: {
                ...user,
                cartItems: cartItemsObj,
            },
        });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message })
    }

}