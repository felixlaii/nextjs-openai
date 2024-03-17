import React, { useState } from "react";
import ChatBox from "../components/ui/chat-box";
import { MessageProps } from "../components/ui/chat-box";

const Home: React.FC = () => {
  const [conversationHistory, setConversationHistory] = useState<
    MessageProps[]
  >([]);

  const handleSendMessage = async (message: string) => {
    try {
      const response = await fetch("/api/hello", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: message,
          conversationHistory, // Use current state here
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setConversationHistory((prevConversationHistory) => [
          ...prevConversationHistory,
          { role: "user", content: message }, // Update user message here
          { role: "assistant", content: data.assistantMessage },
        ]);
      } else {
        console.error("Error calling API:", response.statusText);
        // Handle error gracefully (e.g., display a message to the user)
      }
    } catch (error) {
      console.error("Error calling API:", error);
      // Handle error gracefully (e.g., display a message to the user)
    }
  };

  return (
    <div className="flex justify-center mt-14">
      <div className="w-full max-w-md">
        <h1 className="text-center font-mono text-xl text-gray-600 font-bold tracking-widest mt-6">
          ChatGPT Clone
        </h1>
        <ChatBox
          conversationHistory={conversationHistory}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default Home;
