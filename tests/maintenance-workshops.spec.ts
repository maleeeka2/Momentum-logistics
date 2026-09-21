import { test, expect } from '@playwright/test';

test.describe('Maintenance Workshops Functional Tests', () => {

  test('should display Workshops page', async ({ page }) => {
    await page.goto('/maintenance/workshops');

    await expect(
      page.getByRole('heading', { name: 'Workshops' })
    ).toBeVisible();

    await expect(
      page.getByText('Internal and external workshop network for fleet servicing and repairs.')
    ).toBeVisible();

    await expect(
      page.getByRole('button', { name: 'Add Workshop' })
    ).toBeVisible();
  });

  test('should display all workshop cards', async ({ page }) => {
    await page.goto('/maintenance/workshops');

    const main = page.getByRole('main');

    await expect(main.getByText('Momentum Central Workshop', { exact: true })).toBeVisible();
    await expect(main.getByText('Mussafah Fleet Service Center', { exact: true })).toBeVisible();
    await expect(main.getByText('Al Ain Truck & Trailer Repair', { exact: true })).toBeVisible();
    await expect(main.getByText('Gulf Diesel Technics', { exact: true })).toBeVisible();
    await expect(main.getByText('Riyadh Heavy Vehicle Workshop', { exact: true })).toBeVisible();
    await expect(main.getByText('Muscat Fleet Care', { exact: true })).toBeVisible();
  });

  test('should display workshop types and locations', async ({ page }) => {
    await page.goto('/maintenance/workshops');

    const main = page.getByRole('main');

    await expect(main.getByText('Internal', { exact: true }).first()).toBeVisible();
    await expect(main.getByText('External', { exact: true }).first()).toBeVisible();

    await expect(main.getByText('Dubai', { exact: true }).first()).toBeVisible();
    await expect(main.getByText('Abu Dhabi', { exact: true }).first()).toBeVisible();
    await expect(main.getByText('Al Ain', { exact: true }).first()).toBeVisible();
    await expect(main.getByText('Sharjah', { exact: true }).first()).toBeVisible();
    await expect(main.getByText('Riyadh', { exact: true }).first()).toBeVisible();
    await expect(main.getByText('Muscat', { exact: true }).first()).toBeVisible();
  });

  test('should display workshop specialties and ratings', async ({ page }) => {
    await page.goto('/maintenance/workshops');

    const main = page.getByRole('main');

    await expect(main.getByText('Engine Overhaul', { exact: true }).first()).toBeVisible();
    await expect(main.getByText('Electrical', { exact: true }).first()).toBeVisible();
    await expect(main.getByText('Preventive Maintenance', { exact: true }).first()).toBeVisible();
    await expect(main.getByText('Tyres', { exact: true }).first()).toBeVisible();
    await expect(main.getByText('Trailer Repair', { exact: true }).first()).toBeVisible();
    await expect(main.getByText('Diesel Systems', { exact: true }).first()).toBeVisible();

    await expect(main.getByText('4.7', { exact: true })).toBeVisible();
    await expect(main.getByText('4.6', { exact: true })).toBeVisible();
    await expect(main.getByText('4.3', { exact: true })).toBeVisible();
    await expect(main.getByText('4.5', { exact: true })).toBeVisible();
    await expect(main.getByText('4.4', { exact: true })).toBeVisible();
    await expect(main.getByText('4.8', { exact: true })).toBeVisible();
  });

  test('should display active jobs and work order counts', async ({ page }) => {
    await page.goto('/maintenance/workshops');

    const main = page.getByRole('main');

    await expect(main.getByText('4 active', { exact: true })).toBeVisible();
    await expect(main.getByText('3 active', { exact: true })).toBeVisible();
    await expect(main.getByText('2 active', { exact: true }).first()).toBeVisible();
    await expect(main.getByText('1 active', { exact: true }).first()).toBeVisible();
  });

});
