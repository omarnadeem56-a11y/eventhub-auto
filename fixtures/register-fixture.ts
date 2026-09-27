import { test as base } from '@playwright/test';
import { RegisterPage } from '../pages/register-page';

type RegisterFixtures = {
  registerPage: RegisterPage;
};

export const test = base.extend<RegisterFixtures>({
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await use(registerPage);
  },
});

export { expect } from '@playwright/test';
