import React, { useState } from "react";

import { type Message } from "ai";

import { useClipboard } from "@custom-react-hooks/all";

interface ChatMessageActionsProps extends React.ComponentProps<"div"> {
  message: Message;
}

export default function Copy({
  message,
  className,
  ...props
}: ChatMessageActionsProps) {
  const { copyToClipboard, pasteFromClipboard, state } = useClipboard();
  const [textToCopy, setTextToCopy] = useState("");
  const [pastedText, setPastedText] = useState("");
}
