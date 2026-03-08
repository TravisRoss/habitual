"use client";

import { requestPasswordResetAction } from "@/app/_lib/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { forgotPasswordSchema, type ForgotPasswordFormValues } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

const inputClass = "bg-card border-border focus-visible:ring-brand focus-visible:border-brand text-foreground aria-invalid:border-red-400";

export default function ForgotPasswordForm() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({ resolver: zodResolver(forgotPasswordSchema) });

  async function onSubmit(data: ForgotPasswordFormValues) {
    const result = await requestPasswordResetAction(data.email);
    if (result.error) {
      setError("root", { message: result.error });
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-nunito text-2xl">Check your email</CardTitle>
          <CardDescription>
            If an account exists for that email, we&apos;ve sent a reset link. It expires in 1 hour.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link
            href="/login"
            className="font-nunito font-semibold text-sm text-brand hover:text-brand-dim hover:underline transition-colors"
          >
            Back to Log In
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-nunito text-2xl">Forgot your password?</CardTitle>
        <CardDescription>Enter your email and we&apos;ll send you a reset link.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
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
              {isSubmitting ? <Spinner className="size-4" /> : "Send Reset Link"}
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
