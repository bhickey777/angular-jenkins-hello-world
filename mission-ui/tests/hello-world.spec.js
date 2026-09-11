const { test, expect } = require('@playwright/test');

test('deployed Angular application displays the Jenkins test message', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Hello from Angular!' })).toBeVisible();
  await expect(page.locator('#status')).toHaveText('Jenkins deployment test successful.');
});
