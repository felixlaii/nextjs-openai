// pages/index.tsx

import React, { useState } from "react";
import ChatBox from "../components/ui/chat-box";
import { Message, MessageProps } from "../components/ui/chat-box";
const Home: React.FC = () => {
  // State to manage the conversation history
  const [conversationHistory, setConversationHistory] = useState<
    MessageProps[]
  >([]);

  // Function to handle sending messages
  const handleSendMessage = async (message: string) => {
    // Update the conversation history
    setConversationHistory([
      ...conversationHistory,
      { role: "user", content: message },
    ]);

    try {
      // Make an API call to get the assistant's reply
      const response = await fetch("/api/hello", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: message,
          conversationHistory,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setConversationHistory([
          ...conversationHistory,
          { role: "assistant", content: data.assistantMessage },
        ]);
      } else {
        console.error("Error calling API:", response.statusText);
      }
    } catch (error) {
      console.error("Error calling API:", error);
    }
  };
  return (
    <div>
      <h1>Your Chat Application</h1>
      {/* Render the ChatBox component with the current conversation history and the function to update it */}
      <ChatBox
        conversationHistory={conversationHistory}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default Home;
