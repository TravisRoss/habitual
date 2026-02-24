import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-svh w-full bg-page-bg flex items-center justify-center p-6">
      <div className="w-full max-w-sm text-center space-y-4">
        <h1 className="font-nunito font-bold text-xl text-foreground">
          Forgot your password?
        </h1>
        <p className="font-nunito text-muted-foreground text-sm">
          Password reset is not available yet. Use Sign in with Google or
          GitHub, or create an account with email if you haven&apos;t already.
        </p>
        <Link
          href="/login"
          className="inline-block font-nunito font-extrabold text-brand hover:text-brand-dim hover:underline"
        >
          Back to Log In
        </Link>
      </div>
    </main>
  );
}
