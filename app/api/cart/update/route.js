import { db } from '@/lib/prisma'
import { getAuth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'


export async function POST(request) {
    try {
        
        const  { userId } = getAuth(request)
        
        const { cartData } = await request.json()

        await db.user.findUnique({
            where: { clerkId: userId }
        })

       if(!user){
           return NextResponse.json({ success: false, message: 'User not found' })
       }
        await db.user.update({
            where: { clerkId: userId },
            data: {
                cartItems: cartData
            }
        })

        return NextResponse.json({ success: true });

    } catch (error) {
        return NextResponse.json( { success:false, message:error.message } )
    }
}