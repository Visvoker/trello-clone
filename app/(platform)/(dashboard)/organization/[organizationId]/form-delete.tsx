"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export function FormDelete() {
  const { pending } = useFormStatus();
  return (
    <div>
      <Button type="submit" variant="destructive" size="sm" disabled={pending}>
        Delete
      </Button>
    </div>
  );
}
