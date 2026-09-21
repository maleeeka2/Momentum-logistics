import { test, expect } from '@playwright/test';

test.describe('Fleet Tracking Functional Tests', () => {

  test('should display Live Tracking page and fleet summary', async ({ page }) => {
    await page.goto('/fleet/tracking');

    await expect(
      page.getByRole('heading', { name: 'Live Tracking' })
    ).toBeVisible();

    await expect(page.getByText('Fleet Status', { exact: true })).toBeVisible();

    await expect(page.getByText('Moving', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Idle', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Offline', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Maintenance', { exact: true }).first()).toBeVisible();
  });

  test('should display vehicle tracking information', async ({ page }) => {
    await page.goto('/fleet/tracking');

    const main = page.getByRole('main');

    await expect(main.getByText('Odometer', { exact: true })).toBeVisible();
    await expect(main.getByText('Fuel', { exact: true })).toBeVisible();
    await expect(main.getByText('Tracker', { exact: true })).toBeVisible();
    await expect(main.getByText('Utilization', { exact: true })).toBeVisible();
  });

  test('should display recent tracking events', async ({ page }) => {
    await page.goto('/fleet/tracking');

    const main = page.getByRole('main');

    await expect(
      main.getByText('Recent Tracking Events', { exact: true })
    ).toBeVisible();

    await expect(main.getByText('Tracker ping received')).toBeVisible();
    await expect(main.getByText('Location updated')).toBeVisible();
  });

  test('should navigate to driver details from tracked vehicle', async ({ page }) => {
  await page.goto('/fleet/tracking');

  const main = page.getByRole('main');

  const driverName = main.getByRole('button', { name: 'Mohammed Al Rashid' });

  await expect(driverName).toBeVisible();
  await driverName.click();

  await expect(page).toHaveURL(/\/fleet\/drivers\/.+/);
});

});


