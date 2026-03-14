import { auth } from "@/app/_lib/auth";
import { Dashboard } from "./Dashboard";
import { fetchDailyQuote } from "../_lib/quotes";

export default async function Page() {
  const session = await auth();
  const quotes = await fetchDailyQuote();
  const firstName = session?.user?.name?.split(" ")[0] ?? "";
  return <Dashboard userName={firstName} quote={quotes[0]} />;
}
