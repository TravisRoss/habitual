"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./theme-providers";
import { NextIntlClientProvider } from "next-intl";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { useState } from "react";
import { makeQueryClient } from "@/app/_lib/queryClient";

export function Providers({
  children,
  locale,
  messages,
  session,
}: {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, unknown>;
  session: Session | null;
}) {
  const [queryClient] = useState(() => makeQueryClient());

  const [persister] = useState(() => {
    if (typeof window === "undefined") return null;

    return createAsyncStoragePersister({
      storage: window.localStorage,
    });
  });

  const maxAge = 1000 * 60 * 60 * 24; // 1 day

  const content = (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: { fontFamily: "var(--font-nunito)" },
        }}
      />
      {children}
      <ReactQueryDevtools buttonPosition="top-right" />
    </NextIntlClientProvider>
  );

  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {persister ? (
          <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{ persister, maxAge }}
            onSuccess={() => {
              console.log("query cache restored from storage");
            }}
          >
            {content}
          </PersistQueryClientProvider>
        ) : (
          <QueryClientProvider client={queryClient}>
            {content}
          </QueryClientProvider>
        )}
      </ThemeProvider>
    </SessionProvider>
  );
}
