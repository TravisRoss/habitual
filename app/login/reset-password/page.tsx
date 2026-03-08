import ResetPasswordForm from "@/components/features/auth/ResetPasswordForm";
import Link from "next/link";

type Props = { searchParams: Promise<{ token?: string }> };

export default async function ResetPasswordPage({ searchParams }: Props) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm text-center space-y-4">
          <p className="font-nunito text-muted-foreground text-sm">
            This reset link is invalid or has already been used.
          </p>
          <Link
            href="/login/forgot-password"
            className="inline-block font-nunito font-extrabold text-brand hover:text-brand-dim hover:underline"
          >
            Request a new link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
}
