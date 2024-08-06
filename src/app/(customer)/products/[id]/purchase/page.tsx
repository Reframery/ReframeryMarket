"use client"
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { useCallback } from "react";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

export default function PurchasePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch(`/api/purchase/${id}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  const options = {fetchClientSecret};

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={options}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}

