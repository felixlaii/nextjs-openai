import React, { useState } from "react";

interface Message {
  role: string;
  content: string;
}

interface ChatBoxProps {
  conversationHistory: Message[];
  onSendMessage: (message: string) => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({
  conversationHistory,
  onSendMessage,
}) => {
  const [inputMessage, setInputMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      onSendMessage(inputMessage);
      setInputMessage("");
    }
  };
};
