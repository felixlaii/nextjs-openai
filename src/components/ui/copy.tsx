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

  return (
    <div className={cn("", className)} {...props}>
      <Button onClick={handleCopy}>
        {textToCopy ? (
          <CheckIcon className="h-4 w-4 text-emerald-500" />
        ) : (
          <CopyIcon className="h-4 w-4 text-zinc-500" />
        )}
        <span className="sr-only">Copy message</span>
        Copy to Clipboard
      </Button>
      <Button onClick={handlePaste}>Paste from Clipboard</Button>

      {state.success && <p>Operation successful!</p>}
      {state.error && <p>Error: {state.error}</p>}

      <p>Pasted Text: {pastedText}</p>
    </div>
  );
}
