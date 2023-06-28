require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = async (req, res) => {
  try {
    console.log("Generating compliment with OpenAI...");

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant. Keep your answers short and sweet. Feel free to use emojis" },
        { role: "user", content: "Generate a compliment" },
      ],
      temperature: 2,
      max_tokens:20,
    });

    console.log("Received response from OpenAI: ", completion);

    res.status(200).json(completion.data.choices[0].message);
  } catch (error) {
    console.error("Error generating compliment: ", error);

    // Send a 500 error response back to the client with the error message
    res.status(500).json({ error: error.toString() });
  }
};
