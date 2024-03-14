import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon } from "lucide-react";
// import { useClipboard } from "@custom-react-hooks/all";

interface ChatMessageActionsProps extends React.ComponentProps<"div"> {
  content: string;
}

export default function Copy({
  content,
  className,
  ...props
}: ChatMessageActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
    } catch (error) {
      console.error("Error copying text:", error);
    }
  };

  return (
    <div className={cn("", className)} {...props}>
      <Button
        variant="secondary"
        size="icon"
        className="h-8 w-8"
        onClick={handleCopy}
        disabled={copied}
      >
        {copied ? (
          <CheckIcon className="h-4 w-4 text-emerald-500" />
        ) : (
          <CopyIcon className="h-4 w-4 text-zinc-500" />
        )}
        <span className="sr-only">Copy message</span>
      </Button>

      {copied && <p className="text-xs">Copied!</p>}
    </div>
  );
}
