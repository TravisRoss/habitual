"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./theme-providers";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <Toaster
          position="top-center"
          gutter={8}
          containerStyle={{ zIndex: 1000 }}
          toastOptions={{
            duration: 1000,
            style: { fontFamily: "var(--font-nunito)" },
          }}
        />
        {children}
        <ReactQueryDevtools buttonPosition="top-right" />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
