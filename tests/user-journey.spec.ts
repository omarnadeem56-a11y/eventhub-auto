import { test, expect } from '../fixtures';

test('new user can register, log out and log back in', async ({ registerPage, loginPage, navBar }) => {
  // Arrange
  const password = 'Lantern7^Quiet!Fig';
  const user = {
    email: `omar+${Date.now()}@test.com`,
    password,
    confirmPassword: password,
  };
  await registerPage.goto();
  await registerPage.register(user);
  await expect(navBar.logoutButton).toBeVisible();

  //await navBar.logout();
  await expect(loginPage.signInButton).toBeHidden();

  await loginPage.goto();
  await loginPage.login(user);
  await expect(navBar.logoutButton).toBeVisible();
});