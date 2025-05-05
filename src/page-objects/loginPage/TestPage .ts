import { Locator, Page } from "@playwright/test";
import { DataFactoryPhysicalMember } from "../../utils/DataFactoryPhysicalMember";
import { faker } from "@faker-js/faker";

export default class TestPage {
  private page: Page;
  private pim: Locator;
  private employeeName: Locator;
  private arrows: Record<string, Locator>;

  // Déclaration des listes dynamiques
  private employeeStatusOptions = ["Part-Time Internship", "Part-Time Contract", "Full-Time Permanent", "Full-Time Contract"];
  private includeOptions = ["Current and Past Employees", "Past Employees Only"];
  private jobTitleOptions = ["QA Lead", "QA Engineer", "Software Engineer", "Project Manager"];
  private subUnitOptions = ["Engineering", "Administration", "Development", "Quality Assurance"];
  
  constructor(page: Page) {
    this.page = page;
    this.pim = page.locator("//span[text()='PIM']");
    this.employeeName = page.locator("(//label[normalize-space(text())='Employee Name']/following::input)[1]");
    this.arrows = {
      employeeStatus: page.locator("(//div[@class='oxd-select-text--after']//i)[1]"),
      include: page.locator("(//div[@class='oxd-select-text--after']//i)[2]"),
      jobTitle: page.locator("(//div[@class='oxd-select-text--after']//i)[3]"),
      subUnit: page.locator('form i').nth(3),
    };
  }

  async clickPim() {
    await this.pim.click();
  }

  async fillEmployeeData() {
    const { gender, lastName } = DataFactoryPhysicalMember.getEmployeeData();
    await this.employeeName.fill(lastName);
    console.log(`Nom généré Par la lib fakers : ${lastName}`);

    await this.selectEmployeeDetails(gender);
  }

  private async selectEmployeeDetails(gender: string) {
    // Sélectionner les options en fonction du genre
    const selectedStatus = gender === "Male" ? this.getRandomOption(this.employeeStatusOptions.slice(0, 2)) : this.getRandomOption(this.employeeStatusOptions.slice(2));
    const selectedInclude = gender === "Male" ? this.includeOptions[0] : this.includeOptions[1];
    const selectedJobTitle = gender === "Male" ? this.getRandomOption(["QA Lead", "QA Engineer"]) : this.getRandomOption(["Software Engineer", "Project Manager"]);
    const selectedSubUnit = this.getRandomOption(this.subUnitOptions);

    // Sélectionner les valeurs dans l'interface
    await this.selectOption(this.arrows.employeeStatus, selectedStatus);
    await this.selectOption(this.arrows.include, selectedInclude);
    //await this.selectOption(this.arrows.jobTitle, selectedJobTitle);
    await this.selectOption(this.arrows.subUnit, selectedSubUnit);

    console.log(`🚀 Employé généré :  - ${gender} \n🔹 Status : ${selectedStatus} \n🔹 Include : ${selectedInclude} \n🔹 Job Title : ${selectedJobTitle} \n🔹 Sub Unit : ${selectedSubUnit}`);
  }

  private async selectOption(arrow: Locator, optionName: string) {
    await arrow.click();
    const optionLocator = this.page.getByRole('option', { name: optionName });
    await optionLocator.click();
  }

  private getRandomOption(optionsArray: string[]): string {
    return optionsArray[Math.floor(Math.random() * optionsArray.length)];
  }
}
