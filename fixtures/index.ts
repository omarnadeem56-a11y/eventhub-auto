import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { RegisterPage } from '../pages/register-page';

type Fixtures = {
  loginPage: LoginPage;
  registerPage: RegisterPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await use(registerPage);
  },
});

export { expect } from '@playwright/test';
