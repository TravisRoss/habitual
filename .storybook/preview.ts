import React from "react";
import type { Preview } from "@storybook/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "../messages/en.json";
import "../app/globals.css";

const preview: Preview = {
  decorators: [
    (Story) => {
      const props = { locale: "en", messages, children: React.createElement(Story) };
      return React.createElement(NextIntlClientProvider, props);
    },
  ],
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
