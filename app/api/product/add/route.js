import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server'
import  authAdmin  from '@/lib/authAdmin';
import {db} from '@/lib/prisma';

export async function POST(request) {
    try {
        const { userId } = getAuth(request)
        const isAdmin = await authAdmin(userId)
        if (!isAdmin) {
            return NextResponse.json({ success: false, message: 'not authorized' })
        }

        const body = await request.json();
        const { name, description, category, price, images } = body;

        if (!images || images.length === 0) {
            return NextResponse.json({ success: false, message: 'no images uploaded' })
        }

        const newProduct = await db.product.create({
            data: {
                name,
                description,
                category,
                price: Number(price),
                images,
            }
        });

        return NextResponse.json({ success: true, message: 'Upload successful', newProduct });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}