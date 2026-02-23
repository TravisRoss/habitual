import { HabitForm } from "./HabitForm";
import type { HabitFormValues } from "@/lib/zod";

type EditHabitFormProps = {
  habit: HabitFormValues;
  onEditHabit?: (data: HabitFormValues) => Promise<{ error?: string }>;
  onCancel?: () => void;
};

export function EditHabitForm({ habit, onEditHabit, onCancel }: EditHabitFormProps) {
  return (
    <HabitForm
      defaultValues={{
        ...habit,
        description: habit.description ?? undefined,
        color: habit.color ?? undefined,
        weekly_target: habit.weekly_target ?? undefined,
        target_days: habit.target_days ?? undefined,
      }}
      onSubmit={onEditHabit}
      submitLabel="Save Changes"
      onCancel={onCancel}
    />
  );
}
