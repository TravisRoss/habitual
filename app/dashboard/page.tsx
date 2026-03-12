import { auth } from "@/app/_lib/auth";
import { Dashboard } from "./Dashboard";

export default async function Page() {
  const session = await auth();
  const firstName = session?.user?.name?.split(" ")[0] ?? "";
  return <Dashboard userName={firstName} />;
}
