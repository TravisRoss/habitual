"use client";

import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import type { SignUpFormValues } from "@/lib/zod";
import { useTranslations } from "next-intl";

const inputClass =
  "bg-card border-border focus-visible:ring-brand focus-visible:border-brand text-foreground aria-invalid:border-red-400";

type Props = {
  register: UseFormRegister<SignUpFormValues>;
  errors: FieldErrors<SignUpFormValues>;
  passwordLabel?: string;
  confirmLabel?: string;
};

export default function SignUpFields({
  register,
  errors,
  passwordLabel,
  confirmLabel,
}: Props) {
  const tFields = useTranslations("auth.fields");

  return (
    <>
      <Field>
        <FieldLabel htmlFor="name">{tFields("fullName")}</FieldLabel>
        <Input
          id="name"
          type="text"
          autoComplete="name"
          aria-invalid={!!errors.name}
          className={inputClass}
          {...register("name")}
        />
        <FieldError errors={[errors.name]} />
      </Field>

      <Field>
        <FieldLabel htmlFor="email">{tFields("email")}</FieldLabel>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          className={inputClass}
          {...register("email")}
        />
        <FieldError errors={[errors.email]} />
      </Field>

      <Field>
        <FieldLabel htmlFor="password">{passwordLabel ?? tFields("password")}</FieldLabel>
        <PasswordInput
          id="password"
          autoComplete="new-password"
          aria-invalid={!!errors.password}
          className={inputClass}
          {...register("password")}
        />
        <FieldError errors={[errors.password]} />
      </Field>

      <Field>
        <FieldLabel htmlFor="confirm">{confirmLabel ?? tFields("confirmPassword")}</FieldLabel>
        <PasswordInput
          id="confirm"
          autoComplete="new-password"
          aria-invalid={!!errors.confirm}
          className={inputClass}
          {...register("confirm")}
        />
        <FieldError errors={[errors.confirm]} />
      </Field>
    </>
  );
}
