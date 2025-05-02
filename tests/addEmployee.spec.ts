import { test, expect } from "@playwright/test";
import ExcelUtils from "../src/utils/ExcelUtils";
import { LoginData } from "../src/interfaces/LoginData"; // Importation de l'interface LoginData
import { EmployeeData } from "../src/interfaces/EmployeeData"; // Importation de l'interface EmployeeData
import LoginPagexcls from "../src/page-objects/loginPage/LoginPagexcls";
import PimPage from "../src/page-objects/loginPage/PimPage";

// const loginData = ExcelUtils.getSheetData<LoginData>('Login')[0];
// const employeesData = ExcelUtils.getSheetData<EmployeeData>('Employees');

// à revoir
const loginData = ExcelUtils.getLoginData()[0];
const employeesData = ExcelUtils.getEmployeeData()[0]; //  pour la premiére ligne

test("Login and add employees from Excel", async ({ page }) => {
  const loginPagexcls = new LoginPagexcls(page);
  const pimPage = new PimPage(page);

  await test.step("Login to OrangeHRM", async () => {
    //await loginPagexcls.login(loginData.username, loginData.password);
    //await expect(page).toHaveURL(/dashboard/);

    // à revoir
    await page.goto("/");
    await loginPagexcls.login(loginData.username, loginData.password);
    await expect(page).toHaveURL(/dashboard/);
  });

  // for (const employee of employeesData) {
  // await test.step(`Add employee: ${employee.firstName} ${employee.lastName}`, async () => {
  // await pimPage.navigateToAddEmployee();
  // await pimPage.createEmployee(employee.firstName, employee.middleName ?? '', employee.lastName, employee.employeeId);
  // await expect(page.locator('.orangehrm-header-container')).toContainText('Personal Details');
  //  await expect(page.getByRole('heading', { name: 'Personal Details' })).toBeVisible();
  //  await expect(page.locator('h6')).toHaveText('Personal Details'); // ne fonctionne pas
  // });
  // }
  // à revoir
  await test.step("Ajouter un employé", async () => {
    await pimPage.navigateToAddEmployee();
    await pimPage.createEmployee(
      employeesData.firstName,
      employeesData.middleName || "",
      employeesData.lastName,
      //employeesData.employeeId
    );
    await expect(
      page.getByRole("heading", { name: "Personal Details" })
    ).toBeVisible();
  });
});

test('Login and add all employees from file Excel', async ({ page }) => {
  const loginData = ExcelUtils.getLoginData()[0];
  const employeesData = ExcelUtils.getEmployeeData();

  const loginPage = new LoginPagexcls(page);
  const pimPage   = new PimPage(page);

  await test.step('Login to OrangeHRM', async () => {
    await page.goto('/');
    await loginPage.login(loginData.username, loginData.password);
    await expect(page).toHaveURL(/dashboard/);
  });

  for (const emp of employeesData) {
    await test.step(`Ajouter l'employé : ${emp.firstName} ${emp.lastName}`, async () => {
      await pimPage.navigateToAddEmployee();
      await pimPage.createEmployee(
        emp.firstName,
        emp.middleName || '',
        emp.lastName
      );
      await expect(page.getByRole('heading', { name: 'Personal Details' })).toBeVisible();
    });
  }
});
