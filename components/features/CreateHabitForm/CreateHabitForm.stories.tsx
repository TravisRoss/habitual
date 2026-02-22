import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { CreateHabitForm } from "./CreateHabitForm";

const meta: Meta<typeof CreateHabitForm> = {
  title: "Features/CreateHabitForm",
  component: CreateHabitForm,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-md p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CreateHabitForm>;

export const Default: Story = {};

export const SuccessfulSubmit: Story = {
  args: {
    onCreateHabit: fn().mockResolvedValue({}),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    await userEvent.type(
      canvas.getByRole("textbox", { name: /name/i }),
      "Drink water",
    );
    await userEvent.click(canvas.getByRole("button", { name: /create/i }));

    await expect(args.onCreateHabit).toHaveBeenCalledOnce();
    await expect(args.onCreateHabit).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Drink water" }),
    );
  },
};

export const ServerError: Story = {
  args: {
    onCreateHabit: fn().mockResolvedValue({ error: "Something went wrong" }),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(
      canvas.getByRole("textbox", { name: /name/i }),
      "Drink water",
    );
    await userEvent.click(canvas.getByRole("button", { name: /create/i }));

    await expect(canvas.getByText(/something went wrong/i)).toBeInTheDocument();
  },
};

export const WeeklyFrequencyFlow: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await userEvent.click(canvas.getByRole("combobox", { name: "Frequency" }));
    await userEvent.click(body.getByRole("option", { name: "Weekly" }));

    await expect(canvas.getByText("Times per week")).toBeInTheDocument();
    await expect(
      canvas.queryByText("Days of the week"),
    ).not.toBeInTheDocument();
  },
};

export const CustomFrequencyFlow: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await userEvent.click(canvas.getByRole("combobox", { name: "Frequency" }));
    await userEvent.click(body.getByRole("option", { name: "Custom days" }));

    await expect(canvas.getByText("Days of the week")).toBeInTheDocument();

    await userEvent.click(canvas.getByRole("checkbox", { name: "Mon" }));
    await userEvent.click(canvas.getByRole("checkbox", { name: "Wed" }));
    await userEvent.click(canvas.getByRole("checkbox", { name: "Fri" }));

    await expect(canvas.getByRole("checkbox", { name: "Mon" })).toBeChecked();
    await expect(canvas.getByRole("checkbox", { name: "Wed" })).toBeChecked();
    await expect(canvas.getByRole("checkbox", { name: "Fri" })).toBeChecked();
  },
};

export const ColorSelection: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const amber = canvas.getByRole("button", { name: "Select color #F59E0B" });

    await userEvent.click(amber);
    await expect(amber).toHaveAttribute("aria-pressed", "true");
  },
};
