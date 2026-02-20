"use client";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";

export default function OTPPage() {
  const [value, setValue] = useState("");

  return (
    <main className="min-h-screen bg-[#FFFBEB] flex items-center justify-center px-6">
      <div className="w-full max-w-[375px] flex flex-col gap-10 py-12">

        <div className="flex flex-col gap-3">
          <h1 className="font-nunito font-bold text-[44px] leading-tight text-[#0F172A]">
            Verify
          </h1>
          <p className="font-nunito font-semibold text-sm text-[#64748B] max-w-[259px]">
            Enter the One Time Password (OTP) code we&apos;ve sent to your email
          </p>
        </div>

        <InputOTP maxLength={5} value={value} onChange={setValue}>
          <InputOTPGroup className="gap-[13px]">
            {Array.from({ length: 5 }).map((_, i) => (
              <InputOTPSlot
                key={i}
                index={i}
                className="w-[49px] h-[48px] bg-white border-[#E2E8F0] rounded-[4px] font-nunito font-bold text-lg text-[#0F172A] focus:border-[#D97706] data-[active=true]:border-[#D97706] data-[active=true]:ring-[#D97706]"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>

        <Button
          className="w-full h-[49px] font-nunito font-extrabold text-sm text-white border-0 btn-primary"
          disabled={value.length < 5}
        >
          Submit
        </Button>

      </div>
    </main>
  );
}
