import { expect } from '@playwright/test';
import { test } from '../fixtures';
import { createUser } from '../test-data/users';

test.describe('Register page', () => {
  test.beforeEach(async ({ registerPage }) => {
    await registerPage.goto();
  });

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

  test('registers a new user', async ({ page, registerPage, navBar }) => {
    const password = 'Lantern7^Quiet!Fig';
    const user = createUser();
    await registerPage.register(user);
    await expect(page).toHaveURL('/');
    await expect(navBar.logoutButton).toBeVisible();
  });
});
