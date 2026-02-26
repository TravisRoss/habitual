"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";

type FormProps = {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  isSubmitting: boolean;
  rootError?: string;
  submitLabel?: string;
  onCancel?: () => void;
  children: React.ReactNode;
};

export function Form({
  onSubmit,
  isSubmitting,
  rootError,
  submitLabel = "Save",
  onCancel,
  children,
}: FormProps) {
  return (
    <form onSubmit={onSubmit} noValidate>
      <FieldGroup>
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
              <Link href="/dashboard">Cancel</Link>
            </Button>
          )}
        </div>
      </FieldGroup>
    </form>
  );
}
