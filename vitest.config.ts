import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    projects: [
      // Unit tests
      {
        test: {
          name: "unit",
          environment: "node",
          include: ["**/*.test.ts"],
          exclude: ["**/*.integration.test.ts", "**/node_modules/**"],
        },
      },
      // Component tests (React Testing Library)
      {
        resolve: {
          alias: { "@": dirname },
        },
        test: {
          name: "component",
          environment: "jsdom",
          include: ["**/*.test.tsx"],
          exclude: ["**/*.stories.*", "**/node_modules/**"],
        },
      },
      // Integration tests (hit the real database)
      {
        resolve: {
          alias: { "@": dirname },
        },
        test: {
          name: "integration",
          environment: "node",
          include: ["**/*.integration.test.ts"],
          setupFiles: ["./test/integration-setup.ts"],
        },
      },
      // Storybook tests
      {
        extends: true,
        plugins: [
          storybookTest({ configDir: path.join(dirname, ".storybook") }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: "chromium" }],
          },
          setupFiles: [".storybook/vitest.setup.ts"],
        },
      },
    ],
  },
});
