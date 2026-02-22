"use client";

import { Habit } from "@/types";

export default function HabitsList({ habits }: { habits: Habit[] }) {
  return (
    <ul className="space-y-4">
      {habits.map((habit) => (
        <li
          key={habit.id}
          className="p-4 bg-white rounded shadow flex items-center space-x-4"
        >
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: habit.color ?? "#ccc" }}
          />
          <div>
            <p className="font-semibold">{habit.name}</p>
            <p className="text-sm text-gray-500">{habit.frequency}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
