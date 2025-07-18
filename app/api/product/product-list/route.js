import { orderDummyData } from '@/assets/assets'
import { db } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request) {
    try {

        // Fetch all products from the database
        const products = await db.product.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        })
        return NextResponse.json({ success:true, products })

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message })
    }
}