import { test, expect } from "@playwright/test";
// npx playwright test --headed
// npx playwright test --debug
test.describe("Login and Registration", () => {
  let context;
  let page;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext({
      slowMo: 5000,
    });
    page = await context.newPage();
  });

  test.afterAll(async () => {
    await context.close();
  });

  test("User can login successfully", async () => {
    await page.goto("http://localhost:3000/login");

    await page.fill('[data-testid="email-input"]', "fast33210@gmail.com");
    await page.fill('[data-testid="password-input"]', "Hello123");
    await page.click("button.login-submit-button");
    await page.waitForNavigation();
    await page.waitForTimeout(2000);

    await expect(page).toHaveURL(/chatbot/);
  });

  test("User cannot login with incorrect credentials", async () => {
    await page.goto("http://localhost:3000/login");

    await page.fill('[data-testid="email-input"]', "wronguser@example.com");
    await page.fill('[data-testid="password-input"]', "wrongpassword");
    await page.click("button.login-submit-button");

    const errorMessage = page.locator(".ant-message-notice");
    await expect(errorMessage).toBeVisible();
    await page.waitForTimeout(2000);
  });

  test("Validation error for empty fields", async () => {
    await page.goto("http://localhost:3000/login");

    await page.click("button.login-submit-button");

    const emailError = await page.locator('[data-testid="email-error"]');
    const passwordError = await page.locator('[data-testid="password-error"]');

    await expect(emailError).toBeVisible();
    await expect(passwordError).toBeVisible();
    await page.waitForTimeout(2000);
  });
});
