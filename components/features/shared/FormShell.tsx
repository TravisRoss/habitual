"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

type FormShellProps = {
  onSubmit: NonNullable<React.ComponentProps<"form">["onSubmit"]>;
  isSubmitting: boolean;
  rootError?: string;
  submitLabel?: string;
  onCancel?: () => void;
  cancelHref?: string;
  children: React.ReactNode;
};

export function FormShell({
  onSubmit,
  isSubmitting,
  rootError,
  submitLabel = "Save",
  onCancel,
  cancelHref = "/dashboard",
  children,
}: FormShellProps) {
  return (
    <form onSubmit={onSubmit} noValidate>
      {children}

      {rootError && (
        <p
          role="alert"
          className="text-center font-nunito text-sm text-red-500"
        >
          {rootError}
        </p>
      )}

      <div className="flex gap-2 pt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary border-0 font-nunito text-sm font-extrabold text-white"
        >
          {isSubmitting ? <Spinner className="size-4" /> : submitLabel}
        </Button>
        {onCancel ? (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="font-nunito text-sm font-semibold"
          >
            Cancel
          </Button>
        ) : (
          <Button
            variant="outline"
            asChild
            className="font-nunito text-sm font-semibold"
          >
            <Link href={cancelHref}>Cancel</Link>
          </Button>
        )}
      </div>
    </form>
  );
}
