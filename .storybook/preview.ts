import type { Preview } from "@storybook/react";
import "../app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "app",
      values: [
        { name: "app", value: "#FFFBEB" },
        { name: "white", value: "#FFFFFF" },
      ],
    },
    a11y: {
      test: "todo",
    },
  },
};

export default preview;
