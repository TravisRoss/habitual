import { expect, userEvent, within } from "@storybook/test";
import type { Meta, StoryObj } from "@storybook/react";
import MonthNavigator from "./MonthNavigator";
import { MONTH_NAMES } from "@/app/_lib/constants";

const meta: Meta<typeof MonthNavigator> = {
  title: "Components/MonthNavigator",
  component: MonthNavigator,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof MonthNavigator>;

export const AllMonths: Story = {
  args: {
    monthIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const [prev, next] = canvasElement.querySelectorAll("svg");

    await expect(canvas.getByText("January")).toBeInTheDocument();

    await userEvent.click(next);
    await expect(canvas.getByText("February")).toBeInTheDocument();

    await userEvent.click(prev);
    await expect(canvas.getByText("January")).toBeInTheDocument();
  },
};

export const SingleMonth: Story = {
  args: {
    monthIndexes: [2],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("March")).toBeInTheDocument();
    await expect(canvasElement.querySelectorAll("svg")).toHaveLength(0);
  },
};

export const QuarterMonths: Story = {
  args: {
    monthIndexes: [0, 1, 2],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const [prev, next] = canvasElement.querySelectorAll("svg");

    await expect(canvas.getByText("January")).toBeInTheDocument();

    await userEvent.click(next);
    await expect(canvas.getByText("February")).toBeInTheDocument();

    await userEvent.click(next);
    await expect(canvas.getByText("March")).toBeInTheDocument();

    // Wrap forward → back to first
    await userEvent.click(next);
    await expect(canvas.getByText("January")).toBeInTheDocument();

    // Wrap backward → back to last
    await userEvent.click(prev);
    await expect(canvas.getByText("March")).toBeInTheDocument();
  },
};

export const TwoMonths: Story = {
  args: {
    monthIndexes: [5,6],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const [, next] = canvasElement.querySelectorAll("svg");

    await expect(canvas.getByText("January")).toBeInTheDocument();

    await userEvent.click(next);
    await expect(canvas.getByText("February")).toBeInTheDocument();

    // Wrap back to first
    await userEvent.click(next);
    await expect(canvas.getByText("January")).toBeInTheDocument();
  },
};

export const NoMonths: Story = {
  args: {
    monthIndexes: [],
  },
};
