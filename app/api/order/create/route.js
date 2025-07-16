import { inngest } from "@/config/inngest";
import { db } from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { userId } = getAuth(request);
        const { address, items } = await request.json();

        if (!address || !items || items.length === 0) {
            return NextResponse.json({ success: false, message: 'Invalid data' });
        }

       
       // Calculate total amount and build price map
                const productPriceMap = {};
                const itemTotals = await Promise.all(
                items.map(async (item) => {
                    const productId = item.productId || (item.product && item.product.id);
                    if (!productId) throw new Error('Invalid item: missing product id');
                    const product = await db.product.findUnique({
                    where: { id: productId }
                    });
                    if (!product) throw new Error(`Product not found: ${productId}`);
                    productPriceMap[productId] = product.price;
                    return product.price * item.quantity;
                })
                );
                const amount = itemTotals.reduce((acc, val) => acc + val, 0);

                // Create order and order items
                const order = await db.order.create({
                data: {
                    userId,
                    addressId: address,
                    total: amount + Math.floor(amount * 0.02),
                    items: {
                    create: items.map(item => {
                        const productId = item.productId || (item.product && item.product.id);
                        return {
                        productId,
                        quantity: item.quantity,
                        price: productPriceMap[productId]
                        };
                    })
                    }
                },
                include: {
                    items: true,
                    address: true
                }
                });
        await inngest.send({
            name: 'order/created',
            data: {
                userId,
                address,
                items,
                amount: order.total,
                date: Date.now()
            }
        });

        // Clear user cart
        await db.clerkUser.update({
            where: { id: userId },
            data: { cartItems: {} }
        });

        return NextResponse.json({ success: true, message: 'Order Placed', order });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: error.message });
    }
}