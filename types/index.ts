export type HabitFrequency = "daily" | "weekly" | "custom";

export type ProfileForCredentials = {
  id: string;
  email: string | null;
  full_name: string | null;
  password_hash: string | null;
};

export type Habit = {
  id: string;
  user_id: string;
  name: string;
  frequency: HabitFrequency;
  description: string | null;
  color: string | null;
  weekly_target: number | null;
  target_days: number[];
};

export type Goal = {
  id: string;
  user_id: string;
  habit_id: string;
  name: string;
  target: number;
  unit: Unit;
  start_date: string;
  color: string;
  period: Period;
};

export type Completion = {
  id: string;
  habit_id: string;
  user_id: string;
  completed_on: string;
};

export type Streak = {
  habit_id: string;
  user_id: string;
  streak_length: number;
  streak_start: string;
  streak_end: string;
  is_active: boolean;
};

export type Unit = "times" | "hours" | "minutes" | "pages" | "kg" | "custom";

export type Period = "7" | "14" | "30" | "90" | "180" | "365";

export type GoalWithHabit = Goal & {
  habit: Habit;
};

export type ExistingHabitInput = {
  type: "existing";
  id: string;
};

export type NewHabitInput = {
  type: "new";
  name: string;
  description?: string;
  frequency?: "daily" | "weekly" | "custom";
  color?: string;
  weekly_target?: number;
  target_days?: number[];
};

export type CreateGoalInput = {
  name: string;
  target: number;
  period: Period;
  start_date: string;
  unit: Unit;
  habit: ExistingHabitInput | NewHabitInput;
};

export type UpdateGoalInput = Omit<CreateGoalInput, "habit"> & {
  habit: ExistingHabitInput;
};
