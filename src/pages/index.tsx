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
  return <div></div>;
}
