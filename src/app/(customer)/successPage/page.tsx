import prisma from "@/db/db";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Product } from "@prisma/client";
import { formatCurrency } from "@/lib/formatter";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

async function retrieveSession(session_id: string) {
  const session = await stripe.checkout.sessions.retrieve(session_id);

  if (session.status != "complete") {
    return null;
  }

  let products = [];

  if (session.line_items) {
    for (const item of session.line_items.data) {
      products.push(item.id);
    }
  }

  return {
    customer_email: session.customer_details?.email,
    products: products,
  };
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id: string };
}) {
  const session = await retrieveSession(searchParams.session_id);

  const isSuccess = session != null;
  let product = null;

  if (session && session.products.length > 0) {
    const productId = session.products[0];
    product = (await prisma.product.findUnique({
      where: { id: productId },
    })) as Product;
  }

  return (
    <div className="max-w-5xl w-full mx-auto space-y-8">
      <h1 className="text-4xl font-bold">
        {isSuccess ? "Success!" : "Error!"}
      </h1>
      <p>
        We appreciate your business! A confirmation email will be sent to{" "}
        {session?.customer_email}. If you have any questions, please email
        {" "}
        <a href="mailto: market@reframery.com"> market@reframery.com</a>.
      </p>
      {product && (
        <div className="flex gap-4 items-center">
          <div className="aspect-video flex-shrink-0 w-1/3 relative">
            <Image
              src={product.imagePath}
              fill
              alt={product.name}
              className="object-cover"
            />
          </div>
          <div>
            <div className="text-lg">
              {formatCurrency(product.priceInCents / 100)}
            </div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <div className="line-clamp-3 text-muted-foreground">
              {product.description}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
