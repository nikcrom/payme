import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { amount } = JSON.parse(req.body);

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          { price_data: { currency: 'gbp', product_data: { name: 'Support Me' }, unit_amount: amount }, quantity: 1 }
        ],
        mode: 'payment',
        success_url: 'https://your-vercel-app.vercel.app/success',
        cancel_url: 'https://your-vercel-app.vercel.app/cancel',
      });

      res.status(200).json({ id: session.id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
