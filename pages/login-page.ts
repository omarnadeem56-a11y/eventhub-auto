import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly page: Page;

  constructor(page: Page) {

    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
    this.page = page;
  }

  async goto() {
  await this.page.goto('/login');
}

async fillForm (email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);

}

  
}