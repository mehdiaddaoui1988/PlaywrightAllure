import { Page, Locator } from '@playwright/test';
import userQa from '../../test-data/qa/userQa';
import { DataFactory } from '../../utils/DataFactory';
import { faker } from '@faker-js/faker';

export default class LoginPage {
  private username!: Locator;
  private password!: Locator;
  private loginButton!: Locator;
  private genderSelect!: Locator;

  constructor(private page: Page) {
    this.username = this.page.locator("input[name='username']");
    this.password = this.page.locator("input[name='password']");
    this.loginButton = this.page.locator("button[type='submit']");
    this.genderSelect = this.page.locator("select[name='gender']");
  }

  async fillUsername(username: string = userQa.user_auth.login) {
    await this.username.fill(username);
  }

  async fillPassword(password: string = userQa.user_auth.password) {
    await this.password.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async loginToApplication() {
    await this.fillUsername();
    await this.fillPassword();
    await this.clickLoginButton();
  }

  async fillRandomUsernameAndGender() {
    const gender = DataFactory.getRandomGender();
    const firstName = DataFactory.getFirstName(gender);
    await this.username.fill(firstName);
    await this.genderSelect.selectOption({ label: gender });
  }

 
}
