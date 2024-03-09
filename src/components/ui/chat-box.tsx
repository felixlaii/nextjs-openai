import React, { useState } from "react";

interface Message {
  role: string;
  content: string;
}

interface ChatBoxProps {
  conversationHistory: Message[];
  onSendMessage: (message: string) => void;
}
