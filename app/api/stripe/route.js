import Stripe from 'stripe';
import { db } from '@/lib/prisma';
import {NextResponse} from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request){
    try {
        const body = await request.text();
        const sig = request.headers.get('stripe-signature')
        
        const event = stripe.webhooks.constructEvent(
            body, sig, process.env.STRIPE_WEBHOOK_SECRET
        );

        const handlePaymentIntent = async(paymentIntentId, isPaid) => {
            const session = await stripe.checkout.sessions.list({
                payment_intent: paymentIntentId,
            })

            const {orderId,  userId} = session.data[0].metadata

            if (isPaid) {
                await db.order.update({
                    where: { id: orderId },
                    data: { isPaid: true }
                })

                await db.clerkUser.update({
                    where: { id: userId },
                    data: { cartItems: {} }
                })

                await db.cartItem.deleteMany({
                    where: { userId }
                })
                console.log('Order updated and cart cleared for user:', userId);
            }else{
                await db.order.delete({
                    where: { id: orderId },

                })
            }

        }
        switch(event.type){
            case 'payment_intent_succeeded':{
                await handlePaymentIntent(event.data.object.id, true);
                break;
            }
            case 'payment_intent_canceled':{
                await handlePaymentIntent(event.data.object.id, false);
                break;
            }
            default:
                console.error(event.type)
                break;

        }

        return NextResponse.json({received: true});
    } catch (error) {
        console.error('Error handling Stripe webhook:', error);
        return NextResponse.json({error: 'Webhook Error'}, {status: 400});
        
    }
}


export const config = {
    api: {bodyParser: false}
}