"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { OAuthSection } from "@/components/features/OAuthSection";

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
  remember: z.boolean().optional(),
});

type FormValues = z.infer<typeof schema>;

const inputClass = "bg-white border-[#E2E8F0] focus-visible:ring-[#F59E0B] focus-visible:border-[#F59E0B] text-[#0F172A] aria-invalid:border-red-400";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(_data: FormValues) {
    // Wire up email/password auth here
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
                autoFocus
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
                <Checkbox
                  id="remember"
                  className="border-[#E2E8F0] data-[state=checked]:bg-[#F59E0B] data-[state=checked]:border-[#F59E0B]"
                  {...register("remember")}
                />
                <Label htmlFor="remember" className="font-nunito text-[#94A3B8] cursor-pointer">
                  Remember me
                </Label>
              </div>
              <Link href="#" className="font-nunito font-semibold text-sm text-[#F59E0B] hover:underline">
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-[49px] font-nunito font-extrabold text-sm text-white border-0 btn-primary"
            >
              {isSubmitting ? <Spinner className="size-4" /> : "Log In"}
            </Button>
          </FieldGroup>
        </form>

        <OAuthSection dividerLabel="Or log in with" />

        <p className="font-nunito text-sm text-[#94A3B8] text-center">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-extrabold text-[#F59E0B] hover:underline">
            Sign Up
          </Link>
        </p>

      </CardContent>
    </Card>
  );
}
