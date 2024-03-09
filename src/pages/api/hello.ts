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
  }
}
