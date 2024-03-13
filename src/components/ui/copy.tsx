import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { type Message } from "ai";
import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon } from "lucide-react";
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
  const [textToCopy, setTextToCopy] = useState<any>();
  const [pastedText, setPastedText] = useState<any>();

  const handleCopy = async () => {
    await copyToClipboard(textToCopy);
  };

  const handlePaste = async () => {
    const text = await pasteFromClipboard();
    setPastedText(text);
  };
}
