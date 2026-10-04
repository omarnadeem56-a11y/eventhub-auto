import { test, expect } from '../fixtures';
import { createUser } from '../test-data/users';


test.describe('Login page', () => {
    test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('login page loads', async ({ page }) => {
    await expect(page).toHaveTitle(/EventHub/);
    await expect(page).toHaveURL('/login');
  });

  test('shows the sign in form', async ({ loginPage }) => {
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.signInButton).toBeVisible();
  });

  test('sign in button responds to form input', async ({ loginPage }) => {
    const user = createUser();

    await expect(loginPage.signInButton).toBeEnabled();

    await loginPage.fillForm(user.email, user.password);
    await expect(loginPage.emailInput).toHaveValue(user.email);
    await expect(loginPage.passwordInput).toHaveValue(user.password);

    await expect(loginPage.signInButton).toBeEnabled();
  });

  test('shows an error when only the email is filled', async ({ page, loginPage }) => {
    await loginPage.emailInput.fill('domaintest1@test.com');
    await loginPage.signInButton.click();

    await expect(page.getByText('Password must be at least 6 characters')).toBeVisible();
    await expect(page).toHaveURL(/\/login/);
  });
});
