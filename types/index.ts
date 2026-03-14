export const HABIT_FREQUENCIES = ["daily", "custom"] as const;
export type HabitFrequency = (typeof HABIT_FREQUENCIES)[number];

export type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  password_hash: string | null;
  week_starts_on: number;
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
  created_at?: string;
};

export type Goal = {
  id: string;
  user_id: string;
  habit_id: string;
  name: string;
  target_completions: number;
  unit: string;
  start_date: string;
  color: string;
  duration_days: number;
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
  frequency?: HabitFrequency;
  color?: string;
  weekly_target?: number;
  target_days?: number[];
};

export type CreateGoalInput = {
  name: string;
  target: number;
  period: Period;
  start_date: string;
  unit: string;
  habit: ExistingHabitInput | NewHabitInput;
};

export type UpdateGoalInput = Omit<CreateGoalInput, "habit"> & {
  habit: ExistingHabitInput;
};

export type ReportPeriod = "Weekly" | "Monthly" | "Yearly";
export type WeekStartsOn = 0 | 1;
export type Quote = {
  q: string; // quote text
  a: string; // author
  h: string; // pre-formatted HTML quote
};
