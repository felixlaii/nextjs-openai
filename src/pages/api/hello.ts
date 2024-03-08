import type { NextApiRequest, NextApiResponse } from "next";

const { Configuration, OpenAI } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAI(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    prompt: "req.body.text",
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
}
