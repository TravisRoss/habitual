"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { OAuthSection } from "./OAuthSection";
import { signUpWithCredentials } from "@/app/_lib/actions";
import { signUpSchema, type SignUpFormValues } from "@/lib/zod";

const inputClass = "bg-card border-border focus-visible:ring-brand focus-visible:border-brand text-foreground aria-invalid:border-red-400";

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({ resolver: zodResolver(signUpSchema) });

  async function onSubmit(data: SignUpFormValues) {
    const result = await signUpWithCredentials({
      email: data.email,
      password: data.password,
      name: data.name,
    });

    if (result.error) {
      setError("root", { message: result.error });
      return;
    }

    await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/dashboard",
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-nunito text-2xl">Sign Up</CardTitle>
        <CardDescription>Create an account to get started</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
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

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
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
              className="w-full h-[49px] font-nunito font-extrabold text-sm text-white border-0 btn-primary"
            >
              {isSubmitting ? <Spinner className="size-4" /> : "Create Account"}
            </Button>
          </FieldGroup>
          </form>

          <OAuthSection verb="Sign up" />

        <p className="font-nunito text-sm text-muted-foreground text-center">
          Already have an account?{" "}
          <Link href="/login" className="font-extrabold text-brand underline hover:bg-blend-color-burn">
            Sign In
          </Link>
        </p>

      </CardContent>
    </Card>
  );
}
