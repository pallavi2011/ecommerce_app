import { db } from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
    try{
            const { userId } = getAuth(request);
           const { address, items } = await request.json();
           const origin = request.headers.get('origin')
   
           if (!address || !items || items.length === 0) {
               return NextResponse.json({ success: false, message: 'Invalid data' });
           }
           
           let productData = []
          
          // Calculate total amount and build price map
                   const productPriceMap = {};
                   const itemTotals = await Promise.all(
                   items.map(async (item) => {
                       const productId = item.productId || (item.product && item.product.id);
                       if (!productId) throw new Error('Invalid item: missing product id');
                       const product = await db.product.findUnique({
                       where: { id: productId }
                       });
                       productData.push({
                        name:product.name,
                        price: product.price,
                        quantity: item.quantity
                       })
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
                       paymentType: "Stripe",
                       isPaid: false, 
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

                   const line_items = productData.map(item => {
                    return {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: item.name,
                            },
                            unit_amount: item.price * 100, // Convert to cents

                        },
                        quantity: item.quantity,
                    }
                   })

                   const session = await stripe.checkout.sessions.create({
                       payment_method_types: ['card'],
                       line_items,
                       mode: 'payment',
                       success_url: `${origin}/order-completed`,
                       cancel_url: `${origin}/cart`,
                       metadata:{
                            orderId: order.id.toString(),
                            userId: userId
                       }
                   });

                   const url = session.url;


                   await db.cartItem.deleteMany({
                          where: { userId }
                   })

                   return NextResponse.json({ success: true, url });
                }
            
                   catch (error) {
                       console.log(error);
                       return NextResponse.json({ success: false, message: error.message });
                   }
}