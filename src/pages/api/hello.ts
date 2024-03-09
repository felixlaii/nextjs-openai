const { OpenAI } = require("openai");
import type { NextApiRequest, NextApiResponse } from "next";

require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userMessage = {
      role: "assistant",
      content: req.body.text,
    };

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [userMessage],
    });

    if (
      completion.choices &&
      completion.choices.length > 0 &&
      completion.choices[0].message
    ) {
      const assistantMessage = completion.choices[0].message.content || "No content available";

      res.status(200).json({ assistantMessage })
    }
  }
}
