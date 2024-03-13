import { type Message } from "ai";

interface ChatMessageActionsProps extends React.ComponentProps<"div"> {
  message: Message;
}
