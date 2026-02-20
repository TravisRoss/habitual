"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FieldSeparator } from "@/components/ui/field";
import { OAuthButton } from "@/components/ui/OAuthButton";
import { signInWithGoogle, signInWithGitHub } from "@/app/_lib/actions";

interface OAuthSectionProps {
  dividerLabel: string;
}

export function OAuthSection({ dividerLabel }: OAuthSectionProps) {
  return (
    <div className="flex flex-col gap-3">
      <FieldSeparator>{dividerLabel}</FieldSeparator>

      <form action={signInWithGoogle} className="w-full">
        <OAuthButton icon={<FcGoogle className="w-5 h-5" />} label="Continue with Google" />
      </form>

      <form action={signInWithGitHub} className="w-full">
        <OAuthButton icon={<FaGithub className="w-5 h-5" />} label="Continue with GitHub" />
      </form>
    </div>
  );
}
