import { db } from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET(request){
    try {
        
        const { userId } = getAuth(request)

        

        const orders = await db.order.findMany({
            where:{
                userId
            },
            include:{
                items: { include: { product: true } 
            },
                address: true
                },
                
            }
        )

        return NextResponse.json({ success: true, orders });

    } catch (error) {
        return NextResponse.json({ success: false, message:error.message });
    }
}