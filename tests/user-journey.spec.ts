import { test, expect } from '../fixtures';
import { NewUser } from '../types/user';

test('new user can register, log out and log back in', async ({ registerPage, loginPage, navBar }) => {
  // Arrange
  const password = 'Lantern7^Quiet!Fig';
  const user: NewUser = {
   email: `omar+${Date.now()}@test.com`,
    password,
    confirmPassword: password,
};
  await registerPage.goto();
  await registerPage.register(user);
  await expect(navBar.logoutButton).toBeVisible();

  await navBar.logout();
  await expect(navBar.logoutButton).toBeHidden();

  await loginPage.goto();
  await loginPage.login(user);
  await expect(navBar.logoutButton).toBeVisible();
});