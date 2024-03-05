import { useState, useEffect } from "react";
import { ChatProps } from "@/types/chat-types";
export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { type: "user", message: inputValue },
    ]);

    setInputValue("");
  };

  return (
    <>
      <h1>ChatGPT Clone</h1>
      {chatLog.map((message, index) => (
        <div key="index">{message.message} </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="type your message"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">send</button>
      </form>
    </>
  );
}
