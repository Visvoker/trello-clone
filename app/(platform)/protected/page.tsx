"use client";

import { useAuth, UserButton, useUser } from "@clerk/nextjs";

export default function ProtectedPage() {
  const { userId } = useAuth();
  const { user } = useUser();

  return (
    <div>
      <div>ProtectedPage</div>
      <div>User:{user?.firstName}</div>
      <div>UserId:{userId}</div>
      <UserButton 
        afterSwitchSessionUrl="/"
        
      />
    </div>
  );
}
