"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
          <h2 className="text-xl font-semibold">Something went wrong</h2>
          <button onClick={reset} className="text-sm underline">
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
