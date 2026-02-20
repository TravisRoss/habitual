import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent } from "@storybook/test";
import OTPPage from "./page";

const meta: Meta<typeof OTPPage> = {
  title: "Pages/OTP",
  component: OTPPage,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof OTPPage>;

export const Empty: Story = {};

export const Filled: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const inputs = canvas.getAllByRole("textbox");
    await userEvent.type(inputs[0], "48291");
  },
};
