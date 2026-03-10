"use client";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function OTPPage() {
  const [value, setValue] = useState("");
  const t = useTranslations("otp");

  return (
    <main className="min-h-screen bg-page-bg flex items-center justify-center px-6">
      <div className="w-full max-w-[375px] flex flex-col gap-10 py-12">

        <div className="flex flex-col gap-3">
          <h1 className="font-nunito font-bold text-[44px] leading-tight text-foreground">
            {t("title")}
          </h1>
          <p className="font-nunito font-semibold text-sm text-muted-foreground max-w-[259px]">
            {t("description")}
          </p>
        </div>

        <InputOTP maxLength={5} value={value} onChange={setValue}>
          <InputOTPGroup className="gap-[13px]">
            {Array.from({ length: 5 }).map((_, i) => (
              <InputOTPSlot
                key={i}
                index={i}
                className="w-[49px] h-[48px] bg-card border-border rounded-[4px] font-nunito font-bold text-lg text-foreground focus:border-brand-dim data-[active=true]:border-brand-dim data-[active=true]:ring-brand-dim"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>

        <Button
          className="w-full h-[49px] font-nunito font-extrabold text-sm text-white border-0 btn-primary"
          disabled={value.length < 5}
        >
          {t("submit")}
        </Button>

      </div>
    </main>
  );
}
