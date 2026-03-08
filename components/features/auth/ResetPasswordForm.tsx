"use client";

import { resetPasswordAction } from "@/app/_lib/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Spinner } from "@/components/ui/spinner";
import { resetPasswordSchema, type ResetPasswordFormValues } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const inputClass = "bg-card border-border focus-visible:ring-brand focus-visible:border-brand text-foreground aria-invalid:border-red-400";

type Props = { token: string };

export default function ResetPasswordForm({ token }: Props) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({ resolver: zodResolver(resetPasswordSchema) });

  async function onSubmit(data: ResetPasswordFormValues) {
    const result = await resetPasswordAction(token, data.password);
    if (result.error) {
      setError("root", { message: result.error });
      return;
    }
    router.push("/login?reset=success");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-nunito text-2xl">Reset your password</CardTitle>
        <CardDescription>Enter a new password for your account.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="password">New Password</FieldLabel>
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
              <FieldLabel htmlFor="confirm">Confirm Password</FieldLabel>
              <PasswordInput
                id="confirm"
                autoComplete="new-password"
                aria-invalid={!!errors.confirm}
                className={inputClass}
                {...register("confirm")}
              />
              <FieldError errors={[errors.confirm]} />
            </Field>

            {errors.root && (
              <p role="alert" className="text-sm text-red-500 font-nunito text-center">
                {errors.root.message}
              </p>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full font-nunito font-extrabold text-sm text-white border-0 btn-primary"
            >
              {isSubmitting ? <Spinner className="size-4" /> : "Reset Password"}
            </Button>
          </FieldGroup>
        </form>

        <p className="font-nunito text-sm text-muted-foreground text-center">
          <Link href="/login" className="font-extrabold text-brand hover:text-brand-dim hover:underline transition-colors">
            Back to Log In
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
