import React, { useState } from "react";

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
          placeholder="Type your message..."
          className="pr-12 placeholder:italic placeholder:text-zinc-600/75 focus-visible:ring-zinc-500 border p-2 rounded-md"
        />
        <button
          type="submit"
          className={`absolute right-1 top-1 h-8 w-10 ${
            isLoading ? "bg-gray-400" : "bg-blue-500"
          } text-white rounded-md`}
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
