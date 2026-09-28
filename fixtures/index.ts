import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { RegisterPage } from '../pages/register-page';
import { NavBar } from '../pages/nav-bar';          // ① import

type Fixtures = {
  loginPage: LoginPage;
  registerPage: RegisterPage;
  navBar: NavBar;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await use(registerPage);
  },
    navBar: async ({ page }, use) => {                 // ③ fixture
    const navBar = new NavBar(page);
    await use(navBar);
    },
});

export { expect } from '@playwright/test';
