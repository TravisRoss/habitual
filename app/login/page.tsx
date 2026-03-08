import LoginForm from "@/components/features/auth/LoginForm"

type Props = { searchParams: Promise<{ reset?: string }> };

export default async function Page({ searchParams }: Props) {
  const { reset } = await searchParams;

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm resetSuccess={reset === "success"} />
      </div>
    </div>
  )
}
