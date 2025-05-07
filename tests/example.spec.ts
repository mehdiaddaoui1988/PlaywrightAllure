import { test, expect } from '@playwright/test';
import { AllureUtils } from '../src/utils/allure.utils';

test('has title', async ({ page }) => {
  AllureUtils.initSuite("Automation Project", "playwright", "First test");
  AllureUtils.setDescription("Ce test est le premier aprés avoir initier le projet .");
  AllureUtils.setSeverity("minor");
  AllureUtils.addTags("login", "smoke");
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
