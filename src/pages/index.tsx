// pages/index.tsx

import React, { useState } from "react";
import ChatBox from "../components/ui/chat-box";
import { Message } from "../components/ui/chat-box";
const Home: React.FC = () => {
  // State to manage the conversation history
  const [conversationHistory, setConversationHistory] = useState<Message[]>([]);

  // Function to handle sending messages
  const handleSendMessage = (message: string) => {
    // Update the conversation history
    setConversationHistory((prevHistory) => [
      ...prevHistory,
      { role: "user", content: message },
    ]);
    // Here you might want to make an API call to your OpenAI backend
    // and update the conversationHistory with the assistant's reply
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
