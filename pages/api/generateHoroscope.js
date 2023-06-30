require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = async (req, res) => {
  try {
    console.log("Generating horoscope with OpenAI...");

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant. Keep your answers very short and sweet. Feel free to use emojis.take on the role of an insightful seer." },
        { role: "user", content: "Draw upon the Barnum/Forer effect to provide a compelling and universally relatable prediction. Remember, this prediction should be able to resonate with most people who read it, regardless of their personal circumstances. 2 sentences max. " },
      ],
      temperature: 1.5,
      max_tokens: 45,
    });

    console.log("Received response from OpenAI: ", completion);

    res.status(200).json(completion.data.choices[0].message);
  } catch (error) {
    console.error("Error generating horoscope: ", error);

    // Send a 500 error response back to the client with the error message
    res.status(500).json({ error: error.toString() });
  }
};
