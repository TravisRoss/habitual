import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Banner from "./Banner";

const meta = {
  component: Banner,
  args: {
    completed: 3,
    total: 5,
  },
} satisfies Meta<typeof Banner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllComplete: Story = {
  args: { completed: 5, total: 5 },
};

export const NoneComplete: Story = {
  args: { completed: 0, total: 5 },
};

export const SingleHabit: Story = {
  args: { completed: 1, total: 1 },
};

export const ManyHabits: Story = {
  args: { completed: 7, total: 12 },
};
