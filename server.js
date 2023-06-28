const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const app = express();
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post('/compliment', async (req, res) => {
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {role: 'system', content: 'You are a helpful assistant.'},
        {role: 'user', content: 'Generate me a compliment'}
      ],
    });

    res.json({ compliment: completion.data.choices[0].message.content });
  } catch (error) {
    console.error('Error with OpenAI API:', error);
    res.status(500).json({ error: 'Error generating compliment' });
  }
});

app.listen(3001, () => {
  console.log('Server is listening on port 3001');
});
