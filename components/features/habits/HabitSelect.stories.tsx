import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "@storybook/test";
import { HabitSelect } from "./HabitSelect";
import { Habit } from "@/types";

const MOCK_HABITS: Habit[] = [
  {
    id: "habit-1",
    user_id: "user-1",
    name: "Morning Run",
    frequency: "daily" as const,
    description: null,
    color: null,
    weekly_target: null,
    target_days: [],
  },
  {
    id: "habit-2",
    user_id: "user-1",
    name: "Read 30 minutes",
    frequency: "daily" as const,
    description: null,
    color: null,
    weekly_target: null,
    target_days: [],
  },
  {
    id: "habit-3",
    user_id: "user-1",
    name: "Meditate",
    frequency: "custom" as const,
    description: null,
    color: null,
    weekly_target: 3,
    target_days: [1,2,3,4,5],
  },
];

const meta = {
  component: HabitSelect,
  parameters: {
    layout: "centered",
  },
  args: {
    habits: MOCK_HABITS,
    value: "",
    onChange: fn(),
  },
} satisfies Meta<typeof HabitSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSelection: Story = {
  args: {
    value: "habit-1",
  },
};

export const NoHabits: Story = {
  args: {
    habits: [],
  },
};

export const SingleHabit: Story = {
  args: {
    habits: [MOCK_HABITS[0]],
  },
};

export const ManyHabits: Story = {
  args: {
    habits: Array.from({ length: 12 }, (_, i) => ({
      id: `habit-${i}`,
      user_id: "user-1",
      name: `Habit ${i + 1}`,
      frequency: "daily" as const,
      description: null,
      color: null,
      weekly_target: null,
      target_days: [],
    })),
  },
};
