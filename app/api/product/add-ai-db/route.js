import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server'
import  authAdmin  from '@/lib/authAdmin';
import {db} from '@/lib/prisma';

export async function addProduct({productData, images}){
    try {
        const { userId } = getAuth(request)
        const isAdmin = await authAdmin(userId)
        if (!isAdmin) {
            return NextResponse.json({ success: false, message: 'not authorized' })
        }

        const newProduct = await db.product.create({
            data: {
                ...productData,
                images,
            }
        });

        return NextResponse.json({ success: true, message: 'Product added successfully', data: newProduct });
    } catch (error) {
        
    }
}