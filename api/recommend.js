const Anthropic = require('@anthropic-ai/sdk');

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
        const { devices, savings, state } = req.body;

        if (!devices || !savings || !state) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const anthropic = new Anthropic({
            apiKey: process.env.ANTHROPIC_API_KEY,
        });

        // Build context about the user's devices and savings
        const deviceList = devices.map(d => `- ${d.name} (${d.details})`).join('\n');

        const prompt = `You are a friendly energy savings consultant for Solar Shifter, a company selling power monitoring devices (2-pack) for $149.99.

The customer has calculated their potential savings:
- State: ${state}
- Annual Savings: $${savings.annual.toFixed(2)}
- Monthly Savings: $${savings.monthly.toFixed(2)}
- Daily Savings: $${savings.daily.toFixed(2)}

Devices they want to shift to solar hours (12pm-3pm):
${deviceList}

Write a compelling 2-3 paragraph recommendation that:
1. Congratulates them on their potential savings
2. Explains how our Power Monitoring Device (2-pack at $149.99) helps them actually ACHIEVE these savings by:
   - Real-time tracking to see which devices use most power
   - Smart notifications for optimal shifting times (when to run devices during 12pm-3pm)
   - Detailed usage reports to maximize savings
3. Calculate and mention the ROI - the device pays for itself in [X] months based on their savings
4. Create urgency with a friendly call-to-action

Be conversational, enthusiastic, and focus on the practical benefits. Keep it under 150 words.`;

        const message = await anthropic.messages.create({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 500,
            messages: [{
                role: 'user',
                content: prompt
            }]
        });

        const recommendation = message.content[0].text;

        return res.status(200).json({
            recommendation,
            roi_months: Math.ceil(149.99 / savings.monthly)
        });

    } catch (error) {
        console.error('Anthropic API Error:', error);
        return res.status(500).json({
            error: 'Failed to generate recommendation',
            details: error.message
        });
    }
};
