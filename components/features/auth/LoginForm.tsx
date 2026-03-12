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
import { createLoginSchema, type LoginFormValues } from "@/lib/zod";
import { useTranslations } from "next-intl";

const inputClass = "bg-card border-border focus-visible:ring-brand focus-visible:border-brand text-foreground aria-invalid:border-red-400";

export default function LoginForm({ resetSuccess }: { resetSuccess?: boolean }) {
  const router = useRouter();
  const t = useTranslations("auth.login");
  const tFields = useTranslations("auth.fields");
  const tVal = useTranslations("validation");
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(createLoginSchema(tVal)) });

  async function onSubmit(data: LoginFormValues) {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      setError("root", { message: t("errors.invalidCredentials") });
      return;
    }

    router.push("/dashboard");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-nunito text-2xl">{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {resetSuccess && (
          <p className="text-sm text-green-600 font-nunito text-center bg-green-50 dark:bg-green-950 rounded-md p-3">
            {t("success.passwordReset")}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FieldGroup>
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
              <FieldLabel htmlFor="password">{tFields("password")}</FieldLabel>
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
                  {tFields("rememberMe")}
                </Label>
              </div>
              <Link href="/login/forgot-password" className="font-nunito font-semibold text-sm text-brand hover:text-brand-dim hover:underline transition-colors">
                {t("forgotPassword")}
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
              {isSubmitting ? <Spinner className="size-4" /> : t("button")}
            </Button>
          </FieldGroup>
        </form>

        <OAuthSection verb="Log in" />

        <p className="font-nunito text-sm text-muted-foreground text-center">
          {t("noAccount")}{" "}
          <Link href="/signup" className="font-extrabold text-brand hover:text-brand-dim hover:underline transition-colors">
            {t("signUpLink")}
          </Link>
        </p>

      </CardContent>
    </Card>
  );
}
