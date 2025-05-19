import { allure } from "allure-playwright";
import { Page } from "@playwright/test";

export class AllureUtils {
  /**
   * Initialise une suite Allure structurée : parent, suite, sous-suite
   */
  static initSuite(parent: string, suite: string, subSuite?: string) {
    allure.parentSuite(parent);
    allure.suite(suite);
    if (subSuite) {
      allure.subSuite(subSuite);
    }
  }

  /**
   * Ajoute une description lisible pour le test
   */
  static setDescription(text: string) {
    allure.description(text);
    //test
  }

  /**
   * Ajoute une sévérité : blocker, critical, normal, minor, trivial
   */
  static setSeverity(level: 'blocker' | 'critical' | 'normal' | 'minor' | 'trivial') {
    allure.severity(level);
  }

  /**
   * Ajoute un ou plusieurs tags personnalisés
   */
  static addTags(...tags: string[]) {
    tags.forEach(tag => allure.tag(tag));
  }

  /**
   * Ajoute une pièce jointe JSON avec formatage lisible
   */
  static attachJson(name: string, data: unknown) {
    const content = JSON.stringify(data, null, 2);
    allure.attachment(name, content, "application/json");
  }

  /**
   * Ajoute une capture d'écran (png)
   */
  static async attachScreenshot(name: string, page: Page) {
    const screenshot = await page.screenshot();
    allure.attachment(name, screenshot, "image/png");
  }

  /**
   * Ajoute une capture d’écran uniquement en cas d’erreur
   */
  static async attachScreenshotOnFailure(name: string, page: Page, condition: boolean) {
    if (condition) {
      await this.attachScreenshot(name, page);
    }
  }

  /**
   * Ajoute une pièce jointe textuelle
   */
  static attachText(name: string, text: string) {
    allure.attachment(name, text, "text/plain");
  }

  /**
   * Ajoute une pièce jointe HTML (utile pour debug DOM par ex.)
   */
  static attachHtml(name: string, html: string) {
    allure.attachment(name, html, "text/html");
  }

  /**
   * Ajoute un lien externe (ex: lien Jira, documentation, ticket)
   */
  static addLink(name: string, url: string, type: 'issue' | 'tms' | 'link' = 'link') {
    allure.link(url, name, type);
  }

  /**
   * Marqueur personnalisable (label générique)
   */
  static addLabel(name: string, value: string) {
    allure.label(name, value);
  }
  
}
