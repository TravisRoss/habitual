"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { OAuthSection } from "./OAuthSection";
import SignUpFields from "./SignUpFields";
import { signUpWithCredentials } from "@/app/_lib/actions";
import { createSignUpSchema, type SignUpFormValues } from "@/lib/zod";
import { useTranslations } from "next-intl";


export default function SignUpForm() {
  const router = useRouter();
  const t = useTranslations("auth.signup");
  const tVal = useTranslations("validation");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({ resolver: zodResolver(createSignUpSchema(tVal)) });

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
      redirect: false,
    });
    router.push("/dashboard");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-nunito text-2xl">{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FieldGroup>
            <SignUpFields register={register} errors={errors} />

            {errors.root && (
              <p role="alert" className="text-sm text-red-500 font-nunito text-center">
                {errors.root.message}
              </p>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12.25 font-nunito font-extrabold text-sm text-white border-0 btn-primary"
            >
              {isSubmitting ? <Spinner className="size-4" /> : t("button")}
            </Button>
          </FieldGroup>
          </form>

          <OAuthSection verb="Sign up" />

        <p className="font-nunito text-sm text-muted-foreground text-center">
          {t("hasAccount")}{" "}
          <Link href="/login" className="font-extrabold text-brand underline hover:mix-blend-color-burn">
            {t("signInLink")}
          </Link>
        </p>

      </CardContent>
    </Card>
  );
}
