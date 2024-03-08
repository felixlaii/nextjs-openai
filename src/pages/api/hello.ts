const { Configuration, OpenAI } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAI(configuration);

const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  stream: true,
});
