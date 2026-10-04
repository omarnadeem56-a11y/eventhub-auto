import { Page, Locator } from '@playwright/test';
import { Credentials } from '../types/user';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
  }
  

  async goto() {
    await this.page.goto('/login');
  }

  async fillForm(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async login(details: Credentials) {
    await this.fillForm(details.email, details.password);
    await this.signInButton.click();
  }
}
