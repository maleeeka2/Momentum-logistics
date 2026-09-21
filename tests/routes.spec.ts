import { test, expect } from '@playwright/test';

const routes = [
  '/',
  '/rrr',
  '/jobs',
  '/dispatch',
  '/trips',
  '/fleet/vehicles',
  '/fleet/drivers',
  '/fleet/tracking',
  '/maintenance/workshops',
  '/maintenance',
  '/maintenance/parts',
  '/maintenance/tyres',
  '/finance/expenses',
  '/finance/fuel',
  '/finance/billing',
  '/finance/invoices',
  '/finance/vehicle-pnl',
  '/reports',
  '/analytics',
  '/alerts',
  '/admin/users',
  '/admin/settings',
  '/admin/audit',
];

test.describe('Application Route Smoke Tests', () => {
  for (const route of routes) {
    test(`loads successfully: ${route}`, async ({ page }) => {
      const response = await page.goto(route);

      expect(response).not.toBeNull();
      expect(response!.status()).toBeLessThan(400);

      await expect(page.locator('body')).toBeVisible();
    });
  }
});
