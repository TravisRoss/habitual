import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signInWithGoogle, signInWithGitHub } from "../_lib/actions";
import { auth } from "../_lib/auth";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default async function LoginPage() {
  const session = await auth();
  if (session) redirect("/dashboard");

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground">
            Sign in to track your habits and stay consistent
          </p>
        </div>

        <div className="space-y-3">
          <form action={signInWithGoogle}>
            <Button variant="outline" className="w-full gap-3" size="lg">
              <FcGoogle className="h-5 w-5" />
              Continue with Google
            </Button>
          </form>

          <form action={signInWithGitHub}>
            <Button variant="outline" className="w-full gap-3" size="lg">
              <FaGithub className="h-5 w-5" />
              Continue with GitHub
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
