"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
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
    <li
      className={cn(
        "flex items-center justify-between px-4 py-3 rounded-lg shadow-sm relative overflow-hidden transition-colors duration-300",
        completed ? "bg-green-50" : "bg-white",
      )}
    >
      <span
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ backgroundColor: habit.color ?? "#E5E7EB" }}
      />

      <div className="pl-3">
        <p
          className={cn(
            "font-nunito font-semibold text-sm transition-all duration-300",
            completed && "line-through text-muted-foreground",
          )}
        >
          {habit.name}
        </p>
        <Badge variant="outline" className="text-xs mt-0.5">
          {habit.frequency}
        </Badge>
      </div>

      <div
        className={cn(
          "flex items-center gap-2 transition-transform duration-150",
          completed && "scale-110",
        )}
      >
        <Checkbox
          checked={completed}
          onCheckedChange={(val) => setCompleted(!!val)}
          className="h-5 w-5"
        />
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
      </div>
    </li>
  );
}
