import type { NextApiRequest, NextApiResponse } from "next";
import Configuration, { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
