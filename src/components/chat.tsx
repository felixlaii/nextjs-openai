import { useEffect, useRef, useState } from "react";
import { useChat } from "ai/react";

import { useClerk, useUser } from "@clerk/nextjs";
import { toast } from "sonner";

export default function Chat() {
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false);

  const { isLoaded, isSignedIn, user } = useUser();
  const { openSignIn, session } = useClerk();

  const credits = user?.publicMetadata?.credits;
  const newUser = typeof credits === "undefined";
  const paidUser = user?.publicMetadata?.stripeCustomerId;

  const ref = useRef<HTMLDivElement>(null);
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      initialMessages: [
        {
          id: Date.now().toString(),
          role: "system",
          content: "You are an assistant that gives short answers.",
        },
      ],
      onResponse: (response: any) => {
        if (!response.ok) {
          const status = response.status;

          switch (status) {
            case 401:
              openSignIn();
              break;
            case 402:
              toast.error("You have no credits left.", {
                action: {
                  label: "Get more",
                  onClick: () => setSubscriptionDialogOpen(true),
                },
              });
              break;
            default:
              toast.error(error?.message || "Something went wrong!");
              break;
          }
        }
        session?.reload();
      },
    });
  return <div></div>;
}
