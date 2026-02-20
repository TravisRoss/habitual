import { redirect } from "next/navigation";
import { auth } from "../_lib/auth";
import SignUpForm from "@/components/features/SignUpForm";

export default async function SignUpPage() {
  const session = await auth();
  if (session) redirect("/dashboard");

  return (
    <main className="min-h-screen bg-[#FFFBEB] flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-sm">
        <SignUpForm />
      </div>
    </main>
  );
}
