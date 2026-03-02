import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import BurgerMenu from "./BurgerMenu";

const meta: Meta<typeof BurgerMenu> = {
  title: "Components/BurgerMenu",
  component: BurgerMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    onEdit: fn(),
    onDelete: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof BurgerMenu>;

export const Default: Story = {};

export const InsideCard: Story = {
  decorators: [
    (Story) => (
      <div className="relative flex items-center justify-between rounded-lg border bg-card p-4 shadow-sm w-72">
        <div>
          <p className="font-medium text-sm">Project Alpha</p>
          <p className="text-xs text-muted-foreground">
            Last edited 2 hours ago
          </p>
        </div>
        <Story />
      </div>
    ),
  ],
};

export const InsideTableRow: Story = {
  decorators: [
    (Story) => (
      <table className="w-96 text-sm">
        <tbody>
          <tr className="border-b">
            <td className="py-3 px-4 font-medium">Alice Johnson</td>
            <td className="py-3 px-4 text-muted-foreground">
              alice@example.com
            </td>
            <td className="py-3 px-4 text-right">
              <Story />
            </td>
          </tr>
          <tr>
            <td className="py-3 px-4 font-medium">Bob Smith</td>
            <td className="py-3 px-4 text-muted-foreground">bob@example.com</td>
            <td className="py-3 px-4 text-right">
              <BurgerMenu onEdit={fn()} onDelete={fn()} />
            </td>
          </tr>
        </tbody>
      </table>
    ),
  ],
};

export const MultipleMenus: Story = {
  render: (args) => (
    <ul className="w-80 space-y-1 rounded-lg border p-2">
      {["Design System", "Marketing Site", "API Docs"].map((item) => (
        <li
          key={item}
          className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-muted"
        >
          <span className="text-sm font-medium">{item}</span>
          <BurgerMenu {...args} />
        </li>
      ))}
    </ul>
  ),
};
