"use client";

import Image from "next/image";
import { toast } from "sonner";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { useProModal } from "@/hooks/use-pro-modal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useAction } from "@/hooks/use-action";
import { stripeRedirect } from "@/actions/stripe-redirect";

export default function ProModal() {
  const proModal = useProModal();

  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onClick = () => {
    execute({});
  };
  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent className="">
        <VisuallyHidden>
          <DialogTitle>Title</DialogTitle>
        </VisuallyHidden>

        <div className="aspect-video relative flex items-center justify-center">
          <Image src="/hero.svg" alt="Hero" className="object-cover" fill />
        </div>
        <div className="text-neutral-700 max-auto space-y-6 p-6">
          <h2 className="font-semibold text-xl">
            Upgrade to Taskify pro Today!
          </h2>
          <p className="text-xs font-semibold text-neutral-600">
            Explore the best of Taskify
          </p>
          <div>
            <ul className="text-sm list-disc">
              <li>Unlimited boards</li>
              <li>Advanced checklists</li>
              <li>Admin and security features</li>
              <li>And more!</li>
            </ul>
          </div>
          <Button
            className="w-full"
            variant="primary"
            disabled={isLoading}
            onClick={onClick}
          >
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
