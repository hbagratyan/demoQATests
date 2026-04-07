import { test, expect } from '@playwright/test';

test('Добавление записи в таблицу', async ({ page }) => {
    await page.goto('https://playwright.dev/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
});
