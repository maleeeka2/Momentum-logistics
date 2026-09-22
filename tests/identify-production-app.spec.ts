import { test } from '@playwright/test';

test('identify production application', async ({ page }) => {
  await page.goto('https://momentum-logistics.vercel.app/jobs');
  await page.waitForLoadState('domcontentloaded');

  console.log('TITLE:', await page.title());
  console.log('HEADINGS:', await page.getByRole('heading').allTextContents());
});
