const Stripe = require('stripe');

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

        const { quantity = 1 } = req.body;

        // Get the domain for success/cancel URLs
        const domain = req.headers.origin || req.headers.referer?.replace(/\/$/, '') || 'https://solar-shifter.vercel.app';

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'aud',
                        product_data: {
                            name: 'Power Monitoring Device - 2 Pack',
                            description: 'Track energy usage in real-time, get smart notifications for optimal shifting times, and maximize your savings with detailed usage reports.',
                            images: ['https://solar-shifter.vercel.app/og-image.png'], // You can add a product image later
                        },
                        unit_amount: 14999, // $149.99 in cents
                    },
                    quantity: quantity,
                },
            ],
            mode: 'payment',
            success_url: `${domain}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${domain}?canceled=true`,
            shipping_address_collection: {
                allowed_countries: ['AU'], // Australia only
            },
            billing_address_collection: 'required',
        });

        return res.status(200).json({
            sessionId: session.id,
            url: session.url
        });

    } catch (error) {
        console.error('Stripe Checkout Error:', error);
        return res.status(500).json({
            error: 'Failed to create checkout session',
            details: error.message
        });
    }
};
