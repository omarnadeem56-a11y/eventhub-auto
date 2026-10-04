import { Page, Locator } from '@playwright/test';
import { NewUser } from '../types/user';

export class RegisterPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByTestId('register-email');
    this.passwordInput = page.getByTestId('register-password');
    this.confirmPasswordInput = page.getByPlaceholder('Repeat your password');
    this.registerButton = page.getByTestId('register-btn');
  }

  async goto() {
    await this.page.goto('/register');
  }

  async register(user: NewUser) {
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.confirmPasswordInput.fill(user.confirmPassword);
    await this.registerButton.click();
  }
}
