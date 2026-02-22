import CreateHabitForm from "@/components/features/CreateHabitForm";
import { createHabit } from "@/app/_lib/actions";

export default function NewHabitPage() {
  return (
    <div className="mx-auto max-w-md">
      <CreateHabitForm onCreateHabit={createHabit} />
    </div>
  );
}
