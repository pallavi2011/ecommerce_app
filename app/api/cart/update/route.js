import { db } from '@/lib/prisma'
import { getAuth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST(request) {
    try {
        const { userId } = getAuth(request)
        const { cartItems } = await request.json()
        // cartItems should be an array of { productId, quantity }

        // Remove all existing cart items for this user
        await db.cartItem.deleteMany({ where: { userId } })

        // Create new cart items
        if (Array.isArray(cartItems) && cartItems.length > 0) {
            await db.cartItem.createMany({
                data: cartItems.map(item => ({
                    userId,
                    productId: item.productId,
                    quantity: item.quantity,
                })),
            })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message })
    }
}