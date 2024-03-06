import Head from "next/head";
import React, { useState } from "react";

export default function Home() {
  const [value, setValue] = useState<string>("");
  const [completion, setCompletion] = useState<string>("");

  const handleInput = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    []
  );

  const handleOnClick = async () => {
    setCompletion("loading");
    const response = await fetch("/api/hello");
  };
  return (
    <>
      <div>
        <div>
          <h2>Enter a Prompt</h2>
        </div>
        <input value={value} onChange={handleInput} />
        <button>Generate</button>
      </div>
      <div>
        <h2>Output:</h2>
      </div>
    </>
  );
}
