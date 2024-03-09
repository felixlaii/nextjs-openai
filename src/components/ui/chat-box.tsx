import React, { useState } from "react";

export interface Message {
  role: string;
  content: string;
}

export interface ChatBoxProps {
  conversationHistory: Message[];
  onSendMessage: (message: string) => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({
  conversationHistory,
  onSendMessage,
}) => {
  const [inputMessage, setInputMessage] = useState<string>("");

  const handleSendMessage = async () => {
    // Assuming your API is at /api/chat
    const response = await fetch("/api/hello", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: inputMessage,
        conversationHistory,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const { assistantReply, conversationHistory: updatedHistory } = data;

      // Update conversation history with the new message
      onSendMessage(inputMessage);

      // Add assistant's reply to conversation history
      onSendMessage(assistantReply);

      // No need to update state directly, as it's managed through the prop
      // Clear the input field
      setInputMessage("");
    } else {
      console.error("Error calling OpenAI API:", response.statusText);
    }
  };
  return (
    <div>
      {/* Display the conversation history */}
      <div className="mx-auto mt-3 w-full max-w-lg">
        {conversationHistory.map((message, index) => (
          <div key={index} className="mr-6 whitespace-pre-wrap md:mr-12">
            <p>
              {message.role}: {message.content}
            </p>
          </div>
        ))}
      </div>

      {/* Input field for the user to type a message */}
      <input
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />

      {/* Button to send the message */}
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatBox;
