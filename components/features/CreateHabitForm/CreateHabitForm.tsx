"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HabitForm } from "../HabitForm";
import { useCreateHabit } from "@/hooks/useHabits";

export function CreateHabitForm() {
  const createMutation = useCreateHabit();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-nunito text-2xl text-center">
          Create Habit
        </CardTitle>
        <CardDescription className="text-center">
          Add a new habit to track
        </CardDescription>
      </CardHeader>
      <CardContent>
        <HabitForm onSubmit={createMutation.mutateAsync} submitLabel="Create" />
      </CardContent>
    </Card>
  );
}
