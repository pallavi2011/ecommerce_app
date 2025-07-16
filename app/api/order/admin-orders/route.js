import { db } from "@/lib/prisma";
import authAdmin from "@/lib/authAdmin";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        
        const { userId } = getAuth(request)

        const isAdmin= await authAdmin(userId)

        if (!isAdmin) {
            return NextResponse.json({ success: false, message: 'not authorized' })
        }

       

        const orders = await db.order.findMany({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: true
                    }
                },
                address: true
            },
            orderBy: { createdAt: 'desc' }
        })

        return NextResponse.json({ success: true, orders })

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message })
    }
}