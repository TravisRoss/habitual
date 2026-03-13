"use client";

import Link from "next/link";
import { Button, SubmitButton } from "@/components/ui/button";
import { useTranslations } from "next-intl";

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
  submitLabel,
  onCancel,
  cancelHref = "/dashboard",
  children,
}: FormShellProps) {
  const t = useTranslations("common");

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
        <SubmitButton
          type="submit"
          isSubmitting={isSubmitting}
          className="btn-primary border-0 font-nunito text-sm font-extrabold text-white"
        >
          {submitLabel ?? t("save")}
        </SubmitButton>
        {onCancel ? (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="font-nunito text-sm font-semibold"
          >
            {t("cancel")}
          </Button>
        ) : (
          <Button
            variant="outline"
            asChild
            className="font-nunito text-sm font-semibold"
          >
            <Link href={cancelHref}>{t("cancel")}</Link>
          </Button>
        )}
      </div>
    </form>
  );
}
