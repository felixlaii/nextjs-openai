// pages/index.tsx

import React, { useState } from "react";
import ChatBox from "../components/ui/chat-box";
import { Message } from "../components/ui/chat-box";
const Home: React.FC = () => {
  const [conversationHistory, setConversationHistory] = useState<Message[]>([]);

  const handleSendMessage = (message: string) => {
    const newMessage: Message = {
      role: "user",
      content: message,
    };
    setConversationHistory([...conversationHistory, newMessage]);

    // Now, you can make an API call to OpenAI with the user's message and update the conversationHistory accordingly.
    // Remember to handle the OpenAI response and update the conversationHistory with the assistant's reply.
  };

  return (
    <div>
      <h1>Chat Application</h1>
      <ChatBox
        conversationHistory={conversationHistory}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default Home;
