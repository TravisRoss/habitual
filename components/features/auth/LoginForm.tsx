"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { OAuthSection } from "@/components/features/auth/OAuthSection";
import { loginSchema, type LoginFormValues } from "@/lib/zod";

const inputClass = "bg-card border-border focus-visible:ring-brand focus-visible:border-brand text-foreground aria-invalid:border-red-400";

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(data: LoginFormValues) {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      setError("root", { message: "Invalid email or password." });
      return;
    }

    router.push("/dashboard");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-nunito text-2xl">Log In</CardTitle>
        <CardDescription>Enter your email and password to continue</CardDescription>
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

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <PasswordInput
                id="password"
                autoComplete="current-password"
                aria-invalid={!!errors.password}
                className={inputClass}
                {...register("password")}
              />
              <FieldError errors={[errors.password]} />
            </Field>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Controller
                  name="remember"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="remember"
                      checked={field.value === true}
                      onCheckedChange={(checked) => field.onChange(checked === true)}
                      className="border-border data-[state=checked]:bg-brand data-[state=checked]:border-brand"
                    />
                  )}
                />
                <Label htmlFor="remember" className="font-nunito text-muted-foreground cursor-pointer">
                  Remember me
                </Label>
              </div>
              <Link href="/login/forgot-password" className="font-nunito font-semibold text-sm text-brand hover:text-brand-dim hover:underline transition-colors">
                Forgot Password?
              </Link>
            </div>

            {errors.root && (
              <p role="alert" className="text-sm text-red-500 font-nunito text-center">
                {errors.root.message}
              </p>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-49px font-nunito font-extrabold text-sm text-white border-0 btn-primary"
            >
              {isSubmitting ? <Spinner className="size-4" /> : "Log In"}
            </Button>
          </FieldGroup>
        </form>

        <OAuthSection verb="Log in" />

        <p className="font-nunito text-sm text-muted-foreground text-center">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-extrabold text-brand hover:text-brand-dim hover:underline transition-colors">
            Sign Up
          </Link>
        </p>

      </CardContent>
    </Card>
  );
}
