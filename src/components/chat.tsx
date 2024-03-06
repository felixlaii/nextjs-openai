import { useEffect, useRef, useState } from "react";

import { useClerk, useUser } from "@clerk/nextjs";

export default function Chat() {
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false);

  const { isLoaded, isSignedIn, user } = useUser();
  const { openSignIn, session } = useClerk();
  return <div></div>;
}
