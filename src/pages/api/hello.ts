const { OpenAI } = require("openai");
import type { NextApiRequest, NextApiResponse } from "next";

require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
