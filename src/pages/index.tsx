import React, { useState } from "react";
import ChatBox from "../components/ui/chat-box";
import { Message, MessageProps } from "../components/ui/chat-box";
const Home: React.FC = () => {
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
    <div className="flex flex-column mt-10">
      <div className="w-full justify-center">
        <div>
          <h1 className="text-center text-xl font-bold tracking-wider">
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
