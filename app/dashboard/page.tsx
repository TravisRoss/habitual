import { auth } from "@/app/_lib/auth";
import { Dashboard } from "./Dashboard";

export default async function Page() {
  const session = await auth();
  return <Dashboard userName={session?.user?.name ?? ""} />;
}
