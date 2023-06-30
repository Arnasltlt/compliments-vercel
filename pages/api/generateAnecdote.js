require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = async (req, res) => {
  try {
    console.log("Generating anecdote with OpenAI...");

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a witty comedy writer inspired by George Carlin specialising in very short punchlines, puns, burns and other kinds of short comedy. Feel free to use emojis - only respond with the joke. Don't use these jokes: Why don’t scientists trust atoms? Because they make up everything! 🤓, Why don't skeletons fight each other? Because they don't have the guts! 😂 "},
        { role: "user", content: "What's the best joke you got?" },
      ],
      temperature: 1.5,
      max_tokens: 40,
    });

    console.log("Received response from OpenAI: ", completion);

    res.status(200).json(completion.data.choices[0].message);
  } catch (error) {
    console.error("Error generating anecdote: ", error);

    // Send a 500 error response back to the client with the error message
    res.status(500).json({ error: error.toString() });
  }
};
