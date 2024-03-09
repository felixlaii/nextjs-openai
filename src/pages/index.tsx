import Head from "next/head";
import React, { useState } from "react";

export default function Home() {
  const [value, setValue] = useState<string>("");
  const [assistantMessage, setAssistantMessage] = useState<string | null>(null);

  const handleInput = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    []
  );

  const handleOnClick = async () => {
    const response = await fetch("/api/hello", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: value }),
    });

    if (response.ok) {
      const responseData = await response.json();
      setAssistantMessage(responseData.assistantMessage);
      setValue("");
    } else {
      console.error("Error calling OpenAI API:", response.statusText);
    }
  };

  return (
    <>
      <div>
        <div>
          <h2>Enter a Prompt</h2>
        </div>
        <input value={value} onChange={handleInput} />
        <button onClick={handleOnClick}>Generate</button>
      </div>
      <div>
        <p>Output: {assistantMessage}</p>
      </div>
    </>
  );
}
