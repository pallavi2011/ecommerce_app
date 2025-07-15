import { db } from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET(request) {
    try {
        
        const { userId } = getAuth(request)

       
        const user = await db.user.findUnique({
            where: { clerkId: userId },
            select: { cartItems: true }
        })

        const { cartItems } = user

        return NextResponse.json({ success: true, cartItems})

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}