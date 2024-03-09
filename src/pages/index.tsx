import React, { useState } from "react";

export default function Home() {
  const [value, setValue] = useState<string>("");
  const [assistantMessage, setAssistantMessage] = useState<string | null>(null);

  return <div></div>;
}
