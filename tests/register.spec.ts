import { expect } from '@playwright/test';
import { test } from '../fixtures/register-fixture';

test.describe('Register page', () => {
  test('register page loads', async ({ page, registerPage: _ }) => {
    await expect(page).toHaveTitle(/EventHub/);
    await expect(page).toHaveURL('/register');
  });

  test('shows the register form', async ({ registerPage }) => {
    await expect(registerPage.emailInput).toBeVisible();
    await expect(registerPage.passwordInput).toBeVisible();
    await expect(registerPage.confirmPasswordInput).toBeVisible();
    await expect(registerPage.registerButton).toBeVisible();
  });

  test('registers a new user', async ({ page, registerPage }) => {
    const password = 'Lantern7^Quiet!Fig';
    const user = {
      email: `omar+${Date.now()}@test.com`,
      password,
      confirmPassword: password,
    };
    await registerPage.register(user);
    await expect(page).toHaveURL('/');
    await expect(page.getByText('Logout')).toBeVisible();
  });
});
