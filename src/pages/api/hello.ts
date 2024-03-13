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

    const conversationHistory = req.body.conversationHistory || [];

    const messages = [...conversationHistory, userMessage];

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    const assistantReply =
      completion.choices[0].message.content || "no content available";
    const assistantMessage =
      completion.choices[0].message.content || "No content available";

    if (
      completion.choices &&
      completion.choices.length > 0 &&
      completion.choices[0].message
    ) {
      res.status(200).json({
        assistantReply,
        assistantMessage,
        conversationHistory: [...messages, completion.choices[0].message],
      });
    } else {
      console.error("unexpected response format from OpenAI API:", completion);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
