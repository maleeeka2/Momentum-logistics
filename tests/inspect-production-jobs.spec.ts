import { test } from '@playwright/test';

test('inspect production Jobs buttons', async ({ page }) => {
  await page.goto('https://momentum-logistics.vercel.app/jobs');
  await page.waitForLoadState('domcontentloaded'); await page.waitForTimeout(3000);

  console.log('BUTTONS:', await page.getByRole('button').allTextContents());
});
