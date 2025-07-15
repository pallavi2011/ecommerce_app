import { db } from "@/lib/prisma"
import { getAuth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(request) {
    try {
        
        const { userId } = getAuth(request)
        const {address} = await request.json()

        
        const newAddress = await db.address.create(
            {
                data:{
                    ...address,userId
                }
            }
            )

        return NextResponse.json({ success: true, message: "Address added successfully", newAddress })

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}