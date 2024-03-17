import React, { useState, useRef, useEffect } from "react";
import { SendHorizontalIcon } from "lucide-react";

import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Copy from "./copy";

// Define the shape of message/chat box props
export interface MessageProps {
  role: string;
  content: string;
}
interface ChatBoxProps {
  conversationHistory: MessageProps[];
  onSendMessage: (message: string) => Promise<void>;
}

// Component to display individual messages
export const Message: React.FC<MessageProps> = ({ role, content }) => {
  return (
    <div className={`message ${role === "user" ? "user" : "assistant"}`}>
      {role === "user" ? "You" : "ChatBot"}: {content}
    </div>
  );
};

const ChatBox: React.FC<ChatBoxProps> = ({
  conversationHistory,
  onSendMessage,
}) => {
  // State for the input message and loading indicators
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Scroll to the bottom of the container
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [conversationHistory]);

  // Expanding text area as user types
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [input]);

  // Handler for input change
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  // Handler for form submission
  const onSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }
    if (!input.trim()) return; // Prevent sending empty messages
    setIsLoading(true);

    try {
      await onSendMessage(input);
      setInput(""); // Clear input field after sending message
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setIsLoading(false);
  };

  return (
    <div className="mx-auto mt-3 w-full max-w-lg">
      <div
        ref={chatContainerRef}
        className="mb-2 h-[400px] rounded-md border p-4 overflow-y-auto"
      >
        {conversationHistory.map((m, index) => (
          <div key={index} className="mr-6 whitespace-pre-wrap md:mr-12">
            {m.role === "user" && (
              <div className="mb-6 flex gap-3">
                <Avatar>
                  <AvatarImage />
                  <AvatarFallback className="bg-gray-700 text-sm text-white">
                    U
                  </AvatarFallback>
                </Avatar>
                <div className="mt-1.5">
                  <p className="font-semibold text-sm text-zinc-600">You</p>
                  <div className="mt-1.5 text-xs text-zinc-500">
                    {m.content}
                  </div>
                </div>
              </div>
            )}

            {m.role === "assistant" && (
              <div className="mb-6 flex gap-3">
                <Avatar>
                  <AvatarImage className="" />
                  <AvatarFallback className="bg-zinc-300 text-white text-sm">
                    AI
                  </AvatarFallback>
                </Avatar>
                <div className="mt-1.5 w-full">
                  <div className="flex justify-between">
                    <p className="font-semibold text-zinc-600 text-sm">
                      AI ChatBot
                    </p>
                    <Copy content={m.content} />
                  </div>
                  <div className=" text-xs text-zinc-500">{m.content}</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit} className="relative">
        <textarea
          name="message"
          value={input}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // Prevent default behavior of Enter key
              onSubmit(); // Call the onSubmit function to send the message
            }
          }}
          ref={textAreaRef}
          rows={1}
          placeholder="Ask me anything..."
          className="w-96 h-[1rem] max-h-32 px-4 py-2 placeholder-italic placeholder-zinc-500/65 focus-visible:ring-zinc-200 focus:outline-none focus-visible:ring-1 border p-2 rounded-md resize-none custom-placeholder"
        />

        <Button
          type="submit"
          size="sm"
          variant="outline"
          className={`absolute right-1 top-0.5 h-9 w-12 ${
            isLoading ? "bg-white" : "bg-gray-200"
          } text-white rounded-md`}
          disabled={isLoading}
        >
          <SendHorizontalIcon className="h-5 w-5 text-zinc-500" />
        </Button>
      </form>
    </div>
  );
};

export default ChatBox;
