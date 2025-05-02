import { Page } from '@playwright/test';
import userQa from '../../test-data/qa/userQa';


// à revoir :( 
export default class utils {
  private page: Page;
  private selectors: { [key: string]: string };
  private loginButton: string;

  constructor(page: Page) {
    this.page = page;
    this.selectors = {
      username: "input[name='username']",
      username1: "input[name='username1']",
      username2: "input[name='username2']",
    };
    this.loginButton = "button[type='submit']";
  }

  async fillField(fieldName: string, value: string) {
    const selector = this.selectors[fieldName];
    if (selector) {
      await this.page.fill(selector, value);
    } else {
      throw new Error(`Le champ "${fieldName}" n'est pas défini dans les sélecteurs.`);
    }
  }
  
}
