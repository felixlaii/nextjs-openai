import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";
import { clerkClient, currentUser } from "@clerk/nextjs";
