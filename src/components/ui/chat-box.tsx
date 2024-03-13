import React, { useState } from "react";
import { SendHorizontalIcon } from "lucide-react";

import { Button } from "./button";
interface AvatarProps {
  children?: React.ReactNode;
}
export const Avatar: React.FC<AvatarProps> = ({ children }) => {
  return <div className="avatar">{children}</div>;
};

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
          <Message key={index} role={m.role} content={m.content} />
        ))}
      </div>

      <form onSubmit={onSubmit} className="relative">
        <input
          type="text"
          name="message"
          value={input}
          onChange={handleInputChange}
          placeholder="ask me anything..."
          className="w-full pr-12 placeholder:italic placeholder:text-zinc-500/65 focus-visible:ring-zinc-200 focus:outline-none focus-visible:ring-1 border p-2 rounded-md"
        />
        <Button
          size="sm"
          variant="outline"
          className={`absolute right-1 top-1 h-8 w-20 ${
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
