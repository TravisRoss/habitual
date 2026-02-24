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
  frequency: "daily" | "weekly" | "custom";
  description: string | null;
  color: string | null;
  weekly_target: number | null;
  target_days: number[];
};
