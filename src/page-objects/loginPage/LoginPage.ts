import { Page, Locator } from "@playwright/test";
import userQa from "../../test-data/qa/userQa";
import { DataFactory } from "../../utils/DataFactory";
import { faker } from "@faker-js/faker";

export default class loginPage {
  private page: Page;
  private username: Locator;
  private genderField: Locator;
  private selectors: { [key: string]: string };
  private password: Locator;
  private loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator("input[name='username']");
    this.genderField = page.locator("select[name='gender']");
    this.selectors = {
      username: "input[name='username']",
      username1: "input[name='username1']",
      username2: "input[name='username2']",
    };
    this.password = page.locator("input[name='password']");
    this.loginButton = page.locator("button[type='submit']");
  }

  async fillUsername() {
    await this.username.fill(userQa.user_auth.login);
  }
  async fillField(fieldName: string, value: string) {
    const selector = this.selectors[fieldName];
    if (selector) {
      await this.page.fill(selector, value);
    } else {
      throw new Error(
        `Le champ "${fieldName}" n'est pas défini dans les sélecteurs.`
      );
    }
  }
  async fillUsername1() {
    const genders: ("Male" | "Female")[] = ["Male", "Female"];

    const randomIndex = Math.floor(Math.random() * genders.length);
    const randomGender = genders[randomIndex];
    const randomFirstName = DataFactory.getFirstName1();
    await this.username.fill(randomFirstName);
  }

  async fillUsernameRandom() {
    const randomFirstName = DataFactory.getFirstName1();
    await this.username.fill(randomFirstName);
  }

  async fillUsernameAndGender() {
    const randomGender = DataFactory.getRandomGender();
    const randomFirstName = DataFactory.getFirstName(randomGender);

    await this.username.fill(randomFirstName);

    // Remplir le champ genre en fonction du genre choisi
    await this.genderField.selectOption({ label: randomGender });
  }

  async fillPassword() {
    await this.password.fill(userQa.user_auth.password);
  }
  async clickLoginButton() {
    await this.loginButton.click();
  }

  async getName() {
    const randomName = faker.person.firstName();
    console.log(randomName);
  }

  async loginToApplication() {
    await this.username.fill("Admin");
    await this.password.fill("admin123");
    await this.loginButton.click();
  }

  
}
