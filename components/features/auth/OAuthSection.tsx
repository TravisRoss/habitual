"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { OAuthButton } from "@/components/ui/OAuthButton";
import { signInWithGoogle, signInWithGitHub } from "@/app/_lib/actions";

interface OAuthSectionProps {
  verb: "Log in" | "Sign up";
}

export function OAuthSection({ verb }: OAuthSectionProps) {
  return (
    <div className="flex flex-col gap-3">
      <form action={signInWithGoogle} className="w-full">
        <OAuthButton icon={<FcGoogle className="w-5 h-5" />} label={`${verb} with Google`} />
      </form>

      <form action={signInWithGitHub} className="w-full">
        <OAuthButton icon={<FaGithub className="w-5 h-5" />} label={`${verb} with GitHub`} />
      </form>
    </div>
  );
}
