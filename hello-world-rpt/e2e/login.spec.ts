import { test, expect } from '@playwright/test';

test.describe('Reporting App Login', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5200/login');
  });

  test('should display the login page', async ({ page }) => {

    await expect(page).toHaveURL(/login/);

    await expect(
      page.getByRole('heading', { name: /login/i })
    ).toBeVisible();
  });

  test('should login and navigate to home page', async ({ page }) => {

    await page.getByLabel('Employee Name').fill('John');

    await page.getByLabel('Password').fill('mission123');

    await page.getByRole('button', {
      name: /login/i
    }).click();

    await expect(page).toHaveURL(/home/);

    await expect(
      page.getByText('Customer Lookup')
    ).toBeVisible();

    await expect(
      page.getByText('Employee Information')
    ).toBeVisible();

    await expect(
      page.getByText('Reports')
    ).toBeVisible();
  });

});