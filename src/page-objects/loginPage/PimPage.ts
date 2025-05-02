import { Page, Locator } from "@playwright/test";

export default class PimPage {
  private pimMenuLink: Locator;
  private addEmployeeButton: Locator;
  private firstNameInput: Locator;
  private middleNameInput: Locator;
  private lastNameInput: Locator;
  private employeeIdInput: Locator;
  private saveButton: Locator;
  private errorMessage: Locator;

  constructor(private page: Page) {
    this.pimMenuLink = page.getByRole("link", { name: "PIM" });
    this.addEmployeeButton = page.getByRole("button", { name: "Add" });

    this.firstNameInput = page.locator('input[name="firstName"]');
    this.middleNameInput = page.locator('input[name="middleName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.employeeIdInput = page.locator('input[name="employeeId"]');

    this.saveButton = page.getByRole("button", { name: "Save" });
    this.errorMessage = page.locator(".oxd-input-field-error-message", {
      hasText: "Employee Id already exists",
    });
  }

  async navigateToAddEmployee(): Promise<void> {
    await this.pimMenuLink.click();
    await this.addEmployeeButton.click();
  }

  async createEmployee(firstName: string,middleName: string,lastName: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.middleNameInput.fill(middleName);
    await this.lastNameInput.fill(lastName);

    // 1️⃣ On tente d'abord le prérempli sans le changer
    await this.saveButton.click();

    // 2️⃣ Si erreur, on entre dans la boucle pour générer un ID jusqu'à succès
    for (let attempt = 0; attempt < 10; attempt++) {
      if (!(await this.isIdDuplicate())) {
        return; // terminé avec succès
      }

      // Effacer, générer et retenter
      const randomId = Math.floor(Math.random() * 1_000_000_000).toString().padStart(6, '0');
      await this.employeeIdInput.fill("");
      await this.employeeIdInput.fill(randomId);
      await this.saveButton.click();
    }

    // 3️⃣ Si toujours en échec après 10 tentatives, on laisse l'erreur se propager
    if (await this.isIdDuplicate()) {
      throw new Error(
        "Échec : Aucun Employee ID unique trouvé après 10 tentatives."
      );
    }
  }

  private async isIdDuplicate(): Promise<boolean> {
    await this.page.waitForTimeout(300); // attendre un peu pour laisser apparaître l'erreur
    return await this.errorMessage.isVisible();
  }
}
