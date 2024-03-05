import { useState, useEffect } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <h1>ChatGPT Clone</h1>
      <form>
        <input
          type="text"
          placeholder="type your message"
          value={inputValue}
          onChange={(e) => setInputValue}
        />
      </form>
    </>
  );
}
