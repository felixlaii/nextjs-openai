import { useEffect, useRef, useState } from "react";

import { useClerk, useUser } from "@clerk/nextjs";

export default function Chat() {
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false);

  const { isLoaded, isSignedIn, user } = useUser();
  const { openSignIn, session } = useClerk();

  const credits = user?.publicMetadata?.credits;
  const newUser = typeof credits === "undefined";
  const paidUser = user?.publicMetadata?.stripeCustomerId;
  return <div></div>;
}
