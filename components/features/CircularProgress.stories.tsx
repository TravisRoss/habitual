import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import CircularProgress from "./CircularProgress";

const meta = {
  component: CircularProgress,
  args: {
    value: 70,
    size: 80,
  },
} satisfies Meta<typeof CircularProgress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { value: 70, size: 80 },
  render: (args) => (
    <div className="bg-orange-400 p-6 inline-flex rounded-2xl">
      <CircularProgress {...args} />
    </div>
  ),
};

export const LowProgress: Story = {
  args: { value: 20 },
};

export const HalfProgress: Story = {
  args: { value: 50 },
};

export const Complete: Story = {
  args: { value: 100 },
};

export const Large: Story = {
  args: { value: 70, size: 160 },
};
