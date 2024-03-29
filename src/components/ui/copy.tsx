import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon } from "lucide-react";

// Defining Props
interface ChatMessageActionsProps extends React.ComponentProps<"div"> {
  content: string;
}

export default function Copy({
  content,
  className,
  ...props
}: ChatMessageActionsProps) {
  // State to track whether the content has been copied
  const [copied, setCopied] = useState(false);

  // Function to handle copying the content
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content); // Copy content
      setCopied(true); // Set copied state to true on successful copying
    } catch (error) {
      console.error("Error copying text:", error); // Log error if copying fails
    }
  };

  return (
    <div className={cn("flex flex-row items-center", className)} {...props}>
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
