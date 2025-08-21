import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card", "apple_pay", "google_pay"],
    line_items: [{
      price_data: {
        currency: "usd",
        product_data: { name: "Donation" },
        unit_amount: 500, // $5 donation
      },
      quantity: 1,
    }],
    mode: "payment",
    success_url: `${req.headers.origin}/success`,
    cancel_url: `${req.headers.origin}/cancel`,
  });

  res.status(200).json({ id: session.id });
}
