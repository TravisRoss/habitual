import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import BannerUI from "./BannerUI";

const meta = {
  component: BannerUI,
  args: {
    completionsCount: 3,
    habitsCount: 5,
  },
} satisfies Meta<typeof BannerUI>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllComplete: Story = {
  args: { completionsCount: 5, habitsCount: 5 },
};

export const NoneComplete: Story = {
  args: { completionsCount: 0, habitsCount: 5 },
};

export const SingleHabit: Story = {
  args: { completionsCount: 1, habitsCount: 1 },
};

export const ManyHabits: Story = {
  args: { completionsCount: 7, habitsCount: 12 },
};
