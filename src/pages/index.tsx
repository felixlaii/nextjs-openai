import React, { useState } from "react";
import ChatBox from "../components/ui/chat-box";
import { MessageProps } from "../components/ui/chat-box";

const Home: React.FC = () => {
  const [conversationHistory, setConversationHistory] = useState<
    MessageProps[]
  >([]);

  // Handler for sending messages, and conversation history while calling OpenAI API
  const handleSendMessage = async (message: string) => {
    setConversationHistory([
      ...conversationHistory,
      { role: "user", content: message },
    ]);

    try {
      const response = await fetch("/api/hello", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: message,
          conversationHistory: conversationHistory, // use current state here
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setConversationHistory((prevConversationHistory) => [
          ...prevConversationHistory,
          { role: "assistant", content: data.assistantMessage }, // Update user message here
        ]);
      } else {
        console.error("Error calling API:", response.statusText);
      }
    } catch (error) {
      console.error("Error calling API:", error);
    }
  };
  return (
    <div className="flex flex-column mt-14">
      <div className="w-full justify-center">
        <div>
          <h1 className="text-center font-mono text-xl text-gray-600 font-bold tracking-widest mt-6">
            ChatGPT Clone
          </h1>
        </div>
        {/* Render the ChatBox component with the current conversation history and the function to update it */}
        <ChatBox
          conversationHistory={conversationHistory}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default Home;
