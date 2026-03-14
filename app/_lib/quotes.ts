import { Quote } from "@/types";

export async function fetchDailyQuote(): Promise<Quote[]> {
  const response = await fetch("https://zenquotes.io/api/today", {
    next: { revalidate: 86400 },
  });

  const quotes = await response.json();

  return quotes;
}
