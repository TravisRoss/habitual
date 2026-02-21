/**
 * Auth E2E tests. Requires:
 * - Dev server running (npm run dev) or CI with webServer
 * - Supabase configured with profiles table (incl. password_hash)
 * - NextAuth env vars (AUTH_SECRET, etc.)
 */
import { test, expect } from "@playwright/test";

const uniqueEmail = () => `test-${crypto.randomUUID()}@example.com`;
const validPassword = "TestPass1";

test.describe("Authentication", () => {
  test.describe("Sign up", () => {
    test("signs up with email and password, then redirects to dashboard", async ({
      page,
    }) => {
      const email = uniqueEmail();

      await page.goto("/signup");

      await page.getByLabel("Full Name").fill("Test User");
      await page.getByLabel("Email").fill(email);
      await page.locator('input[name="password"]').first().fill(validPassword);
      await page.getByLabel("Confirm Password").fill(validPassword);

      await page.getByRole("button", { name: "Create Account" }).click();

      await expect(page).toHaveURL("/dashboard");
    });

    test("shows error when signing up with duplicate email", async ({
      page,
    }) => {
      const email = uniqueEmail();

      await page.goto("/signup");

      await page.getByLabel("Full Name").fill("Test User");
      await page.getByLabel("Email").fill(email);
      await page.locator('input[name="password"]').first().fill(validPassword);
      await page.getByLabel("Confirm Password").fill(validPassword);
      await page.getByRole("button", { name: "Create Account" }).click();

      await expect(page).toHaveURL("/dashboard");

      await page.context().clearCookies();
      await page.goto("/signup");
      await expect(page.getByLabel("Full Name")).toBeVisible();

      await page.getByLabel("Full Name").fill("Another User");
      await page.getByLabel("Email").fill(email);
      await page.locator('input[name="password"]').first().fill(validPassword);
      await page.getByLabel("Confirm Password").fill(validPassword);
      await page.getByRole("button", { name: "Create Account" }).click();

      await expect(
        page.getByRole("alert").filter({ hasText: "already exists" })
      ).toBeVisible();
      await expect(page).toHaveURL("/signup");
    });

    test("shows validation errors for invalid input", async ({ page }) => {
      await page.goto("/signup");

      await page.getByRole("button", { name: "Create Account" }).click();

      await expect(page.getByText("Name is required")).toBeVisible();
      await expect(page.getByText("Enter a valid email")).toBeVisible();
      await expect(page).toHaveURL("/signup");
    });
  });

  test.describe("Sign in", () => {
    test("signs in with valid credentials and redirects to dashboard", async ({
      page,
    }) => {
      const email = uniqueEmail();

      await page.goto("/signup");
      await page.getByLabel("Full Name").fill("Test User");
      await page.getByLabel("Email").fill(email);
      await page.locator('input[name="password"]').first().fill(validPassword);
      await page.getByLabel("Confirm Password").fill(validPassword);
      await page.getByRole("button", { name: "Create Account" }).click();
      await expect(page).toHaveURL("/dashboard");

      await page.context().clearCookies();
      await page.goto("/login");
      await expect(page.getByLabel("Email")).toBeVisible();

      const credentialsForm = page.locator("form").first();
      await credentialsForm.getByLabel("Email").fill(email);
      const passwordInput = credentialsForm.locator('input[name="password"]');
      await passwordInput.fill(validPassword);
      await passwordInput.press("Enter");

      await expect(page).toHaveURL("/dashboard", { timeout: 15000 });
    });

    test("rejects invalid credentials and stays on login page", async ({
      page,
    }) => {
      await page.goto("/login");

      await page.getByLabel("Email").fill("nonexistent@example.com");
      await page.locator("#password").fill("WrongPass1");
      await page.getByRole("button", { name: "Log In", exact: true }).click();

      await expect(page).toHaveURL("/login");
    });

    test("shows validation errors for empty fields", async ({ page }) => {
      await page.goto("/login");

      await page.getByRole("button", { name: "Log In", exact: true }).click();

      await expect(page.getByText("Enter a valid email")).toBeVisible();
      await expect(
        page.getByText("Password must be at least 8 characters")
      ).toBeVisible();
      await expect(page).toHaveURL("/login");
    });
  });
});
