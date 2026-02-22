"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
} from "@/components/ui/item";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Habit } from "@/types";

export default function HabitItem({ habit }: { habit: Habit }) {
  const [completed, setCompleted] = useState(false);

  return (
    <Item
      className={cn(
        "relative overflow-hidden border-l-4 transition-colors duration-300",
        completed ? "bg-green-50" : "bg-white",
      )}
      style={{ borderLeftColor: habit.color ?? "#E5E7EB" }}
    >
      <ItemContent>
        <ItemTitle
          className={cn(
            "font-nunito",
            completed && "line-through text-muted-foreground",
          )}
        >
          {habit.name}
        </ItemTitle>
        <ItemDescription>
          <Badge variant="outline" className="text-xs">
            {habit.frequency}
          </Badge>
        </ItemDescription>
      </ItemContent>

      <ItemActions>
        <div
          className={cn(
            "transition-transform duration-150",
            completed && "scale-110",
          )}
        >
          <Checkbox
            checked={completed}
            onCheckedChange={(val) => setCompleted(!!val)}
            className="h-5 w-5"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center p-1 text-gray-500 hover:text-gray-700">
              <MoreVertical className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Pencil className="h-4 w-4 mr-2" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="h-4 w-4 mr-2" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ItemActions>
    </Item>
  );
}
