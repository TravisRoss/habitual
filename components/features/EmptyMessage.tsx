import { Inbox, PlusCircle } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";

export default function EmptyMessage() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Inbox className="h-12 w-12 text-zinc-400" />
        </EmptyMedia>
        <EmptyTitle>No habits yet</EmptyTitle>
        <EmptyDescription>
          Get started by adding your first habit.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Create Habit
        </Button>
      </EmptyContent>
    </Empty>
  );
}
