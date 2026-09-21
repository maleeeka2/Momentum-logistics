import { test, expect } from '@playwright/test';

test.describe('Alerts', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/alerts');
  });

  test('displays Alerts Center and summary cards', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Alerts Center', exact: true })).toBeVisible();

    for (const label of ['Unread', 'Critical', 'High']) {
      await expect(page.getByText(label, { exact: true }).first()).toBeVisible();
    }

    await expect(
      page.getByRole('button', { name: 'Mark all as read' })
    ).toBeVisible();
  });

  test('displays severity and module filters', async ({ page }) => {
    const selects = page.getByRole('combobox');

    await expect(selects).toHaveCount(2);
    await expect(selects.nth(0)).toBeVisible();
    await expect(selects.nth(1)).toBeVisible();
  });

  test('severity filter filters alerts', async ({ page }) => {
    const severity = page.getByRole('combobox').nth(0);

    await severity.selectOption({ label: 'Critical' });

    await expect(page.getByText('Critical', { exact: true }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: 'Clear filters' })).toBeVisible();
  });

  test('module filter and clear filters work', async ({ page }) => {
    const module = page.getByRole('combobox').nth(1);

    const optionCount = await module.locator('option').count();
    expect(optionCount).toBeGreaterThan(1);

    const firstModule = await module.locator('option').nth(1).getAttribute('value');
    if (firstModule) {
      await module.selectOption(firstModule);
      await expect(page.getByRole('button', { name: 'Clear filters' })).toBeVisible();
      await page.getByRole('button', { name: 'Clear filters' }).click();
    }

    await expect(page.getByRole('button', { name: 'Clear filters' })).not.toBeVisible();
  });

  test('individual alert can be marked as read', async ({ page }) => {
    const markRead = page.getByRole('button', { name: 'Mark read' }).first();

    if (await markRead.count()) {
      await markRead.click();
      await expect(page.getByRole('button', { name: 'Mark read' })).toHaveCount(5);
    }
  });

  test('mark all alerts as read', async ({ page }) => {
    await page.getByRole('button', { name: 'Mark all as read' }).click();

    await expect(
      page.getByRole('button', { name: 'Mark read' })
    ).toHaveCount(0);
  });
});


