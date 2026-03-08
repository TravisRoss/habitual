/**
 * Account settings E2E tests. Requires:
 * - Dev server running (npm run dev) or CI with webServer
 */
import { test, expect, type Page } from "@playwright/test";

const uniqueEmail = () => `test-${crypto.randomUUID()}@example.com`;
const validPassword = "TestPass1";
const newPassword = "NewPass2";

async function signUpAndGoToAccount(page: Page) {
  const email = uniqueEmail();

  await page.goto("/signup");
  await page.getByLabel("Full Name").fill("Test User");
  await page.getByLabel("Email").fill(email);
  await page.locator('input[name="password"]').first().fill(validPassword);
  await page.getByLabel("Confirm Password").fill(validPassword);
  await page.getByRole("button", { name: "Create Account" }).click();
  await expect(page).toHaveURL("/dashboard");

  await page.goto("/dashboard/settings/account");

  return email;
}

test.describe("Account settings", () => {
  test("shows pre-filled name and email from session", async ({ page }) => {
    const email = await signUpAndGoToAccount(page);

    await expect(page.getByLabel("Full Name")).toHaveValue("Test User");
    await expect(page.getByLabel("Email")).toHaveValue(email);
  });

  test("shows validation errors for empty name", async ({ page }) => {
    await signUpAndGoToAccount(page);

    await page.getByLabel("Full Name").clear();
    await page.getByRole("button", { name: "Save Changes" }).click();

    await expect(page.getByText("Name is required")).toBeVisible();
  });

  test("shows error when passwords don't match", async ({ page }) => {
    await signUpAndGoToAccount(page);

    await page.locator('input[name="password"]').first().fill(newPassword);
    await page.getByLabel("Confirm New Password").fill("DifferentPass3");
    await page.getByRole("button", { name: "Save Changes" }).click();

    await expect(page.getByText("Passwords don't match")).toBeVisible();
  });

  test("updates account details successfully", async ({ page }) => {
    await signUpAndGoToAccount(page);

    await page.getByLabel("Full Name").fill("Updated Name");
    await page.locator('input[name="password"]').first().fill(newPassword);
    await page.getByLabel("Confirm New Password").fill(newPassword);
    await page.getByRole("button", { name: "Save Changes" }).click();

    await expect(page.getByText("Profile updated successfully")).toBeVisible();
  });
});
