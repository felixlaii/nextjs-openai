import { useToast } from "@apideck/components";
import ChatCompletionRequestMessage from "openai";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { sendMessage } from "./sendMessage";
