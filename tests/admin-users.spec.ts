import { test, expect } from '@playwright/test';

test.describe('Admin Users & Roles', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin/users');
  });

  test('displays Users & Roles page and users table', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Users & Roles', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Invite User' })).toBeVisible();
    await expect(page.getByRole('button', { name: /^Users/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Roles & Permissions/ })).toBeVisible();
    await expect(page.getByPlaceholder('Search name, email, role...')).toBeVisible();
  });

  test('search filters users', async ({ page }) => {
    const search = page.getByPlaceholder('Search name, email, role...');
    await search.fill('admin');
    await expect(page.getByText('admin', { exact: false }).first()).toBeVisible();
  });

  test('users table displays required columns', async ({ page }) => {
    for (const column of ['User', 'Role', 'Department', 'Branch', 'Last Active', 'Status']) {
      await expect(page.getByRole('columnheader', { name: column, exact: true })).toBeVisible();
    }
  });

  test('switches to Roles & Permissions tab', async ({ page }) => {
    await page.getByRole('button', { name: /Roles & Permissions/ }).click();

    await expect(page.getByText('Permission Matrix', { exact: true })).toBeVisible();
    await expect(page.getByText('Module access level by role', { exact: true })).toBeVisible();
  });

  test('roles and permission matrix are displayed', async ({ page }) => {
    await page.getByRole('button', { name: /Roles & Permissions/ }).click();

    await expect(page.getByRole('table')).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Role', exact: true })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Role', exact: true })).toBeVisible();
  });

  test('returns to users tab', async ({ page }) => {
    await page.getByRole('button', { name: /Roles & Permissions/ }).click();
    await page.getByRole('button', { name: /^Users/ }).click();

    await expect(page.getByPlaceholder('Search name, email, role...')).toBeVisible();
    await expect(page.getByText('Permission Matrix', { exact: true })).not.toBeVisible();
  });
});



