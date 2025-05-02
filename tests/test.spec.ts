import { test, expect } from "@playwright/test";
import LoginPage from "../src/page-objects/loginPage/LoginPage";
import TestPage from "../src/page-objects/loginPage/TestPage ";
import userQa from "../src/test-data/qa/userQa";
import { DataFactoryPhysicalMember } from "../src/utils/DataFactoryPhysicalMember";


test.only("Accéder sur le site et s'authentifier", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const testPage = new TestPage(page);
 
  // Naviguer vers la page d'accueil et se connecter
  await page.goto("/");
  await loginPage.loginToApplication();
  await expect(page).toHaveTitle(/OrangeHRM/);

  
  // Etapes de test
  await test.step("Accéder à la page Pim et remplir les informations", async () => {
    await page.pause();
    await testPage.clickPim();
    DataFactoryPhysicalMember.getGenderData();
    console.log(DataFactoryPhysicalMember.getGenderData());  

    await testPage.fillEmployeeData();
    

    
    await page.pause();
  });
});
