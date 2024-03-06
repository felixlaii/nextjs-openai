import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";
import { clerkClient, currentUser } from "@clerk/nextjs";

export const runtime = "edge";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "" });
