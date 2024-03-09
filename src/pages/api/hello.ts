import type { NextApiRequest, NextApiResponse } from "next";
require("dotenv").config();
const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Assuming req.body.text contains the user's input
    const userMessage = {
      role: "assistant",
      content: req.body.text,
    };

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [userMessage],
    });

    // Check if completion.choices is defined and not empty
    if (
      completion.choices &&
      completion.choices.length > 0 &&
      completion.choices[0].message
    ) {
      // Check if 'content' is defined on completion.choices[0].message
      const assistantMessage =
        completion.choices[0].message.content || "No content available";

      // Send a JSON response to the client
      res.status(200).json({ assistantMessage });
    } else {
      // If the response doesn't have the expected structure
      console.error("Unexpected response format from OpenAI API:", completion);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
