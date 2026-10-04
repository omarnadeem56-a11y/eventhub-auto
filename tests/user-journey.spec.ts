import { test, expect } from '../fixtures';
import { createUser } from '../test-data/users';

test('new user can register, log out and log back in', async ({ registerPage, loginPage, navBar }) => {
  // Arrange
  const user = createUser();
  
  await registerPage.goto();
  await registerPage.register(user);
  await expect(navBar.logoutButton).toBeVisible();

  await navBar.logout();
  await expect(navBar.logoutButton).toBeHidden();

  await loginPage.goto();
  await loginPage.login(user);
  await expect(navBar.logoutButton).toBeVisible();
});