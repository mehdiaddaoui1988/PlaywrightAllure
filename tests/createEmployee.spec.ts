// import { test } from "@playwright/test";
// import LoginPagexcls from "../src/page-objects/loginPage/LoginPagexcls";
// import PimPage from "../src/page-objects/loginPage/PimPage";
// import ExcelReader from "../src/utils/ExcelReader";

// const dataPath = "./src/test-data/testdata.xlsx";

// test("Créer un employé avec données Excel", async ({ page }) => {
//   const loginData = ExcelReader.readSheet(dataPath, "Login")[0];
//   const employeeData = ExcelReader.readSheet(dataPath, "Employees")[0];

//   const loginPagexcls = new LoginPagexcls(page);
//   const pimPage = new PimPage(page);

//   await test.step("Se connecter à OrangeHRM", async () => {
//     await loginPagexcls.login(loginData.username, loginData.password);
//   });

//   await test.step("Aller sur Ajouter Employé", async () => {
//     await pimPage.goToAddEmployee();
//   });

//   await test.step("Ajouter un nouvel employé", async () => {
//     await pimPage.addEmployee(employeeData.firstName, employeeData.lastName);
//   });
// });
