import { test, expect } from '@playwright/test';

test('production Jobs page console errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', error => errors.push(error.message));

  await page.goto('https://momentum-logistics.vercel.app/jobs');
  await page.waitForLoadState('networkidle');

  console.log('PRODUCTION_ERRORS:', errors);
  expect(errors).toEqual([]);
});
