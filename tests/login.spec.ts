import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';

class LoginDetails {
  readonly email: string;
  readonly password: string;

  constructor(password: string, email: string = `omar+${Date.now()}@test.com`) {
    this.email = email;
    this.password = password;
  }
}

test.describe('Login page', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('login page loads', async ({ page }) => {
    await expect(page).toHaveTitle(/EventHub/);
    await expect(page).toHaveURL('/login');
  });

  test('shows the sign in form', async () => {
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.signInButton).toBeVisible();
  });

  test('sign in button responds to form input', async () => {
    const details = new LoginDetails('password1');

    await expect(loginPage.signInButton).toBeEnabled();

    await loginPage.fillForm(details.email, details.password);
    await expect(loginPage.emailInput).toHaveValue(details.email);
    await expect(loginPage.passwordInput).toHaveValue(details.password);

    await expect(loginPage.signInButton).toBeEnabled();
  });

  test('shows an error when only the email is filled', async ({ page }) => {
    await loginPage.emailInput.fill('omar@test.com');
    await loginPage.signInButton.click();

    await expect(page.getByText('Password must be at least 6 characters')).toBeVisible();
    await expect(page).toHaveURL(/\/login/);
  });
});
