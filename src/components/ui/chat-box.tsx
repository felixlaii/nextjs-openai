import React, { useState } from "react";
import { SendHorizontalIcon } from "lucide-react";

import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Copy from "./copy";

export interface MessageProps {
  role: string;
  content: string;
}
interface ChatBoxProps {
  conversationHistory: MessageProps[];
  onSendMessage: (message: string) => Promise<void>;
}

export const Message: React.FC<MessageProps> = ({ role, content }) => {
  return (
    <div className={`message ${role === "user" ? "user" : "assistant"}`}>
      {role === "user" ? "You" : "ChatBox"}: {content}
    </div>
  );
};

const ChatBox: React.FC<ChatBoxProps> = ({
  conversationHistory,
  onSendMessage,
}) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/hello", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: input }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "assistant", content: data.assistantReply },
        ]);
      } else {
        console.error("Error calling API:", response.statusText);
      }
    } catch (error) {
      console.error("Error calling API:", error);
    }

    setIsLoading(false);
  };

  return (
    <div className="mx-auto mt-3 w-full max-w-lg">
      <div className="mb-2 h-[400px] rounded-md border p-4 overflow-y-auto">
        {messages.map((m, index) => (
          <div key={index} className="mr-6 whitespace-pre-wrap md:mr-12">
            {m.role === "user" && (
              <div className="mb-6 flex gap-3">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback className="text-sm">U</AvatarFallback>
                </Avatar>
                <div className="mt-1.5">
                  <p className="font-semibold text-sm text-zinc-600">You</p>
                  <div className="mt-1.5 text-sm text-zinc-500">
                    {m.content}
                  </div>
                </div>
              </div>
            )}

            {m.role === "assistant" && (
              <div className="mb-6 flex gap-3">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-emerald-500 text-white">
                    AI
                  </AvatarFallback>
                </Avatar>
                <div className="mt-1.5 w-full">
                  <div className="flex justify-between">
                    <p className="font-semibold text-zinc-600 text-sm">
                      AI ChatBot
                    </p>
                    <Copy message={m} className="mt-1" />
                  </div>
                  <div className="mt-2 text-sm text-zinc-500">{m.content}</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit} className="relative">
        <input
          type="text"
          name="message"
          value={input}
          onChange={handleInputChange}
          placeholder="ask me anything..."
          className="w-full pr-12 pl-4 placeholder:italic placeholder:text-zinc-500/65 focus-visible:ring-zinc-200 focus:outline-none focus-visible:ring-1 border p-2 rounded-md"
        />
        <Button
          size="sm"
          variant="outline"
          className={`absolute right-1 top-1 h-8 w-16 ${
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
