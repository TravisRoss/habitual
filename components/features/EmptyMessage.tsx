import Link from "next/link";
import { PlusCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";

export default function EmptyMessage() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon" className="w-16 h-16 rounded-2xl btn-primary text-white">
          <Sparkles className="h-7 w-7" />
        </EmptyMedia>
        <EmptyTitle className="font-nunito font-bold text-xl text-[#0F172A]">
          No habits yet
        </EmptyTitle>
        <EmptyDescription className="font-nunito text-[#94A3B8] max-w-[240px]">
          Start building your routine by creating your first habit.
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        <Button asChild className="font-nunito font-extrabold text-sm text-white border-0 gap-2 btn-primary">
          <Link href="/dashboard/habits/new">
            <PlusCircle className="h-4 w-4" />
            Create Habit
          </Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
}
