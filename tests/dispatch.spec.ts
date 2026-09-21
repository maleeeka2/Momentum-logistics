import { test, expect } from '@playwright/test';

test.describe('Dispatch Functional Tests', () => {

  test('should display Dispatch Center and dispatch resources', async ({ page }) => {
    await page.goto('/dispatch');

    await expect(page.getByRole('heading', { name: 'Dispatch Center' })).toBeVisible();
    await expect(page.getByText('Unassigned Jobs')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Available Vehicles' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Available Drivers' })).toBeVisible();
    await expect(page.getByText('Active Dispatches').first()).toBeVisible();
    await expect(page.getByText('Dispatch Queue')).toBeVisible();
  });

  test('should open job assignment drawer', async ({ page }) => {
    await page.goto('/dispatch');

    await page.getByRole('button', { name: 'Assign', exact: true }).first().click();

    await expect(
      page.getByRole('combobox', { name: 'Assign Vehicle' })
    ).toBeVisible();

    await expect(
      page.getByRole('combobox', { name: 'Assign Driver' })
    ).toBeVisible();

    await expect(
      page.getByRole('button', { name: 'Confirm Dispatch', exact: true })
    ).toBeVisible();
  });

  test('should prevent dispatch until vehicle and driver are selected', async ({ page }) => {
    await page.goto('/dispatch');

    await page.getByRole('button', { name: 'Assign', exact: true }).first().click();

    const confirmButton = page.getByRole('button', {
      name: 'Confirm Dispatch',
      exact: true,
    });

    await expect(confirmButton).toBeDisabled();
  });

});
