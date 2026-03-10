"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { OAuthButton } from "@/components/ui/OAuthButton";
import { signInWithGoogle, signInWithGitHub } from "@/app/_lib/actions";
import { useTranslations } from "next-intl";

interface OAuthSectionProps {
  verb: "Log in" | "Sign up";
}

export function OAuthSection({ verb }: OAuthSectionProps) {
  const t = useTranslations("auth.oauth");
  const isLogin = verb === "Log in";

  return (
    <div className="flex flex-col gap-3">
      <form action={signInWithGoogle} className="w-full">
        <OAuthButton
          icon={<FcGoogle className="w-5 h-5" />}
          label={isLogin ? t("loginWithGoogle") : t("signupWithGoogle")}
        />
      </form>

      <form action={signInWithGitHub} className="w-full">
        <OAuthButton
          icon={<FaGithub className="w-5 h-5" />}
          label={isLogin ? t("loginWithGitHub") : t("signupWithGitHub")}
        />
      </form>
    </div>
  );
}
