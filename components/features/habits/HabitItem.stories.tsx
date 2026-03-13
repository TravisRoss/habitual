import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import HabitItem from "./HabitItem";
import type { Habit } from "@/types";

const baseHabit: Habit = {
  id: "1",
  user_id: "user-1",
  name: "Morning run",
  frequency: "daily",
  description: "Run 5km every morning",
  color: "#22c55e",
  weekly_target: null,
  target_days: [],
};

const meta: Meta<typeof HabitItem> = {
  title: "Features/HabitItem",
  component: HabitItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
  args: {
    habit: baseHabit,
    isCompleted: false,
    onToggleComplete: fn(),
    onEdit: fn().mockResolvedValue({}),
    onDelete: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof HabitItem>;

export const Default: Story = {};

export const Completed: Story = {
  args: {
    isCompleted: true,
  },
};

export const Weekly: Story = {
  args: {
    habit: {
      ...baseHabit,
      frequency: "daily",
      color: "#6366f1",
    },
  },
};

export const Custom: Story = {
  args: {
    habit: {
      ...baseHabit,
      name: "Meditate",
      frequency: "custom",
      target_days: [1, 3, 5],
      color: "#f97316",
    },
  },
};

export const NoColor: Story = {
  args: {
    habit: {
      ...baseHabit,
      color: null,
    },
  },
};

export const LongName: Story = {
  args: {
    habit: {
      ...baseHabit,
      name: "Read 30 pages of a non-fiction book before going to sleep",
      color: "#ec4899",
    },
  },
};

export const InAList: Story = {
  render: (args) => (
    <ul className="w-96 flex flex-col gap-2">
      {[
        { name: "Morning run", color: "#22c55e", isCompleted: true },
        { name: "Meditate", color: "#6366f1", isCompleted: false },
        { name: "Read", color: "#f97316", isCompleted: false },
      ].map((item) => (
        <li key={item.name}>
          <HabitItem
            {...args}
            habit={{ ...baseHabit, name: item.name, color: item.color }}
            isCompleted={item.isCompleted}
          />
        </li>
      ))}
    </ul>
  ),
};
