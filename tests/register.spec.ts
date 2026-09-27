import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/register-page';


test.describe('Register page', () => {
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.goto();
  });

    test('register page loads', async ({ page }) => {
    await expect(page).toHaveTitle(/EventHub/);
    await expect(page).toHaveURL('/register');
  });

  test('shows the register form', async () => {
    await expect(registerPage.emailInput).toBeVisible();
    await expect(registerPage.passwordInput).toBeVisible();
    await expect(registerPage.confirmPasswordInput).toBeVisible();
    await expect(registerPage.registerButton).toBeVisible();

  });

  test('registers a new user', async ({ page }) => {
    const user = {
      email: `omar+${Date.now()}@test.com`,
      password: 'Lantern7^Quiet!Fig',
      confirmPassword: 'Lantern7^Quiet!Fig',
    };
    await registerPage.register(user);
    await expect(page).toHaveURL('/');


  });
});