import type { NextApiRequest, NextApiResponse } from "next";
import Configuration, { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const chatCompletion = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [{ role: "user", content: "hello world" }],
});
console.log(chatCompletion.data.choices[0].message);
