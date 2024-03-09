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
  return (
    <div
      style={{ border: "1px solid #ccc", padding: "10px", maxWidth: "400px" }}
    >
      <div style={{ maxHeight: "300px", overflowY: "auto" }}>
        {conversationHistory.map((message, index) => (
          <div key={index} style={{ marginBottom: "8px" }}>
            <strong>{message.role}: </strong>
            {message.content}
          </div>
        ))}
      </div>
      <div style={{ marginTop: "10px" }}>
        <input
          type="text"
          value={inputMessage}
          onChange={handleInputChange}
          placeholder="Type your message..."
          style={{ marginRight: "5px" }}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
