# Test info

- Name: Login and add employees from Excel
- Location: C:\Users\maddaoui\Downloads\playwright-Demo\tests\addEmployee.spec.ts:17:5

# Error details

```
Error: page.goto: net::ERR_HTTP_RESPONSE_CODE_FAILURE at https://opensource-demo.orangehrmlive.com/
Call log:
  - navigating to "https://opensource-demo.orangehrmlive.com/", waiting until "load"

    at C:\Users\maddaoui\Downloads\playwright-Demo\tests\addEmployee.spec.ts:27:16
    at C:\Users\maddaoui\Downloads\playwright-Demo\tests\addEmployee.spec.ts:22:14
```

# Page snapshot

```yaml
- heading "Cette page ne fonctionne pas" [level=1]
- paragraph:
  - text: Impossible de traiter cette demande via
  - strong: opensource-demo.orangehrmlive.com
  - text: à l'heure actuelle.
- text: HTTP ERROR 500
- button "Actualiser"
```

# Test source

```ts
   1 | import { test, expect } from "@playwright/test";
   2 | import ExcelUtils from "../src/utils/ExcelUtils";
   3 | import { LoginData } from "../src/interfaces/LoginData"; // Importation de l'interface LoginData
   4 | import { AllureUtils } from "../src/utils/allure.utils"
   5 | import { EmployeeData } from "../src/interfaces/EmployeeData"; // Importation de l'interface EmployeeData
   6 | import LoginPagexcls from "../src/page-objects/loginPage/LoginPagexcls";
   7 | import PimPage from "../src/page-objects/loginPage/PimPage";
   8 |
   9 | // const loginData = ExcelUtils.getSheetData<LoginData>('Login')[0];
  10 | // const employeesData = ExcelUtils.getSheetData<EmployeeData>('Employees');
  11 |
  12 | // à revoir
  13 | const loginData = ExcelUtils.getLoginData()[0];
  14 | const employeesData = ExcelUtils.getEmployeeData()[0]; //  pour la premiére ligne
  15 |
  16 |
  17 | test("Login and add employees from Excel", async ({ page }) => {
  18 |  
  19 |   const loginPagexcls = new LoginPagexcls(page);
  20 |   const pimPage = new PimPage(page);
  21 |
  22 |   await test.step("Login to OrangeHRM", async () => {
  23 |     //await loginPagexcls.login(loginData.username, loginData.password);
  24 |     //await expect(page).toHaveURL(/dashboard/);
  25 |
  26 |     // à revoir
> 27 |     await page.goto("/");
     |                ^ Error: page.goto: net::ERR_HTTP_RESPONSE_CODE_FAILURE at https://opensource-demo.orangehrmlive.com/
  28 |     await loginPagexcls.login(loginData.username, loginData.password);
  29 |     AllureUtils.attachJson("Données utilisateur : ", (loginData.username, loginData.password));
  30 |     await expect(page).toHaveURL(/dashboard/);
  31 |   });
  32 |
  33 |   // for (const employee of employeesData) {
  34 |   // await test.step(`Add employee: ${employee.firstName} ${employee.lastName}`, async () => {
  35 |   // await pimPage.navigateToAddEmployee();
  36 |   // await pimPage.createEmployee(employee.firstName, employee.middleName ?? '', employee.lastName, employee.employeeId);
  37 |   // await expect(page.locator('.orangehrm-header-container')).toContainText('Personal Details');
  38 |   //  await expect(page.getByRole('heading', { name: 'Personal Details' })).toBeVisible();
  39 |   //  await expect(page.locator('h6')).toHaveText('Personal Details'); // ne fonctionne pas
  40 |   // });
  41 |   // }
  42 |   // à revoir
  43 |   await test.step("Ajouter un employé", async () => {
  44 |     await pimPage.navigateToAddEmployee();
  45 |     await pimPage.createEmployee(
  46 |       employeesData.firstName,
  47 |       employeesData.middleName || "",
  48 |       employeesData.lastName,
  49 |       //employeesData.employeeId
  50 |       
  51 |     );
  52 |     
  53 |     await expect(
  54 |       page.getByRole("heading", { name: "Personal Details" })
  55 |     ).toBeVisible();
  56 |   });
  57 | });
  58 |
  59 | test('Login and add all employees from file Excel', async ({ page }) => {
  60 |
  61 |   AllureUtils.initSuite("Automation Project", "OrangeHrm", "Add Employees With excelFiles");
  62 |   AllureUtils.setDescription("Ce test est spécialement pour ajouter tous les employés via un fichier excel déjà rempli .");
  63 |   AllureUtils.setSeverity("critical");
  64 |   AllureUtils.addTags("login", "smoke");
  65 |
  66 |   const loginData = ExcelUtils.getLoginData()[0];
  67 |   const employeesData = ExcelUtils.getEmployeeData();
  68 |
  69 |   const loginPage = new LoginPagexcls(page);
  70 |   const pimPage   = new PimPage(page);
  71 |
  72 |   await test.step('Login to OrangeHRM', async () => {
  73 |     await page.goto('/');
  74 |     await loginPage.login(loginData.username, loginData.password);
  75 |     AllureUtils.attachJson("Données utilisateur : ", (loginData.username, loginData.password));
  76 |     await expect(page).toHaveURL(/dashboard/);
  77 |   });
  78 |
  79 |   for (const emp of employeesData) {
  80 |     await test.step(`Ajouter l'employé : ${emp.firstName} ${emp.lastName}`, async () => {
  81 |       
  82 |       await pimPage.navigateToAddEmployee();
  83 |       await pimPage.createEmployee(
  84 |         emp.firstName,
  85 |         emp.middleName || '',
  86 |         emp.lastName
  87 |       );
  88 |       AllureUtils.attachJson("Données utilisateur : ", (emp.firstName ));
  89 |       AllureUtils.attachJson("Données utilisateur ooo: ", (emp.lastName ));
  90 |       await page.waitForTimeout(2000 ); 
  91 |       await AllureUtils.attachScreenshot("Dashboard", page);
  92 |       await expect(page.getByRole('heading', { name: 'Personal Details' })).toBeVisible();
  93 |     });
  94 |   }
  95 | });
  96 |
```