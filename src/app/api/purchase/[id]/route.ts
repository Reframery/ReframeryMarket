import prisma from "@/db/db";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const product = await prisma.product.findUnique({ where: { id } });
  const headersList = headers();
  if (product == null) {
    return new NextResponse(`Product not found`, {
      status: 400,
    });
  }
  console.log(product);
  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price_data: {
            currency: "usd",
            product: product.id,
            unit_amount: product.priceInCents,
          },
          quantity: 1,
        },
      ],
      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },
      mode: "payment",
      return_url: `${headersList.get(
        "origin"
      )}/successPage?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.json({ clientSecret: session.client_secret });
    // redirect(session.url as string);
  } catch (err: any) {
    // console.log(err);
    return new NextResponse(err.message, {
      status: 500,
    });
  }
}