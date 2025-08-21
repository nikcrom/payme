import Stripe from "stripe";
const stripe = new Stripe("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"); // Secret key

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { amount } = req.body;

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "gbp",
        automatic_payment_methods: { enabled: true },
      });
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

