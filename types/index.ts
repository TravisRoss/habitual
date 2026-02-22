export type ProfileForCredentials = {
  id: string;
  email: string | null;
  full_name: string | null;
  password_hash: string | null;
};

export type Habit = {
  id: string;
  name: string;
  frequency: string;
  description: string | null;
  color: string | null;
  weekly_target: number | null;
  target_days: number[] | null;
};
