import { test, expect } from '@playwright/test';

class LoginDetails {
  readonly email: string;
  readonly password: string;

  constructor(password: string, email: string = `omar+${Date.now()}@test.com`) {
    this.email = email;
    this.password = password;
  }
}

test.describe('Login page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('login page loads', async ({ page }) => {
    await expect(page).toHaveTitle(/EventHub/);
    await expect(page).toHaveURL('/login');
  });

  test('shows the sign in form', async ({ page }) => {
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
  });

  test('sign in button responds to form input', async ({ page }) => {
    const details = new LoginDetails('password1');

    await expect(page.getByRole('button', { name: 'Sign In' })).toBeEnabled();

    await page.getByLabel('Email').fill(details.email);
    await expect(page.getByLabel('Email')).toHaveValue(details.email);

    await page.getByLabel('Password').fill(details.password);
    await expect(page.getByLabel('Password')).toHaveValue(details.password);

    await expect(page.getByRole('button', { name: 'Sign In' })).toBeEnabled();
  });

  test('shows an error when only the email is filled', async ({ page }) => {
    await page.getByLabel('Email').fill('omar@test.com');
    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page.getByText('Password must be at least 6 characters')).toBeVisible();
    await expect(page).toHaveURL(/\/login/);
  });
});