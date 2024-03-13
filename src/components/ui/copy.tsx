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
  const { copyToClipboard, state } = useClipboard();
  const [textToCopy, setTextToCopy] = useState<any>();

  const handleCopy = () => {
    if (state) return copyToClipboard(message.content);
  };

  return (
    <div className={cn("", className)} {...props}>
      <Button
        variant="secondary"
        size="icon"
        className="h-8 w-8"
        onClick={handleCopy}
      >
        {textToCopy ? (
          <CheckIcon className="h-4 w-4 text-emerald-500" />
        ) : (
          <CopyIcon className="h-4 w-4 text-zinc-500" />
        )}
        <span className="sr-only"></span>
      </Button>

      {state.success && <p className="text-xs">copied!</p>}
      {state.error && <p>Error: {state.error}</p>}
    </div>
  );
}
