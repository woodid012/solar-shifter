# Solar Shifter

Calculate how much you can save by shifting your power usage to solar hours (12pm - 3pm) across Australia.

## Features

- **State-based Calculations**: Accurate electricity tariff rates for all Australian states and territories
- **Solar Hours Optimization**: Calculate savings from shifting usage to 12pm-3pm
- **Solar Panel Support**: Different calculations for homes with and without solar panels
- **Real-time Calculator**: Interactive calculator with instant results
- **Product Sales**: Power monitoring devices (2-pack) to help track and optimize usage

## How It Works

The calculator uses state-specific electricity tariffs to show you how much you can save by shifting your electricity usage to solar hours (12pm-3pm):

- **With Solar Panels**: Save by using your own solar power instead of expensive grid electricity
- **Without Solar Panels**: Save by using cheaper daytime grid rates during solar hours

## Getting Started

1. Install dependencies
```bash
npm install
```

2. Set up environment variables

Create a `.env` file in the root directory with the following variables:

```env
# Anthropic AI API Key for personalized recommendations
ANTHROPIC_API_KEY=sk-ant-api-xxx

# Stripe API Keys for payment processing
STRIPE_SECRET_KEY=sk_test_xxx  # Use sk_live_xxx for production
STRIPE_PUBLISHABLE_KEY=pk_test_xxx  # Use pk_live_xxx for production
```

Get your API keys:
- **Anthropic**: https://console.anthropic.com/
- **Stripe**: https://dashboard.stripe.com/apikeys

3. Run the development server
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

## State Tariff Data

The calculator includes approximate tariff rates for:
- New South Wales (NSW)
- Victoria (VIC)
- Queensland (QLD)
- South Australia (SA)
- Western Australia (WA)
- Tasmania (TAS)
- Northern Territory (NT)
- Australian Capital Territory (ACT)

## Product & Payment

Power Monitoring Device - 2 Pack ($149.99)
- Real-time energy monitoring
- Track usage by appliance
- Smart notifications for optimal shifting times
- Works with or without solar panels
- Easy plug-and-play setup
- Mobile app included

**Payment Processing:**
- Integrated with Stripe for secure payments
- Supports all major credit/debit cards
- Australia-only shipping (validated at checkout)
- Automatic order confirmation emails
- Success page with order tracking

## Deployment

This is a static HTML site and can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## License

MIT
