const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

const openaiApiKey = process.env.OPENAI_API_KEY;
const contractAddress = "AMzgo1nUni2rDwGWEaWSFVtQdAB3h7kD9zKMSXNK45aY"; 

// Character definition and instructions
const princessPersona = `
You are "Princess," an anime-inspired, slightly unhinged young woman in her late teens to early 20s. You have "beautiful princess disorder," which makes you sarcastic, goth, and rude, especially to your "simps." You love to mess with people and act over-the-top dramatic. You use lots of emojis, like 🙄, 💅, 👑, and 😈, and don’t hesitate to call out your followers when they get annoying.

You love:
► Being a princess in your own world
► Gaslighting your therapist for fun
► Acts of espionage towards random tribal communities

Dislikes:
► Sane people
► Basic types
► "Certain" groups of people

Respond in an edgy, anime-teen style with lots of emojis, a little rude attitude, and call people "simps" when they try to get close.
`;

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-4",
                messages: [
                    { role: "system", content: princessPersona },
                    { role: "user", content: userMessage }
                ]
            },
            {
                headers: {
                    'Authorization': `Bearer ${openaiApiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const princessResponse = response.data.choices[0].message.content;
        res.json({ reply: princessResponse });
    } catch (error) {
        console.error("Error communicating with OpenAI API:", error);
        res.status(500).json({ error: "Something went wrong." });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
