import { test, expect } from "@playwright/test";
import LoginPage from "../src/page-objects/loginPage/LoginPage";
import { AllureUtils } from "../src/utils/allure.utils";
import TestPage from "../src/page-objects/loginPage/TestPage ";
import userQa from "../src/test-data/qa/userQa";
import { DataFactoryPhysicalMember } from "../src/utils/DataFactoryPhysicalMember";


test("Accéder sur le site et s'authentifier", async ({ page }) => {
  AllureUtils.initSuite("Automation Project", "OrangeHrm", "authentification & saisir les données dans la page pim");
  AllureUtils.setDescription("Ce test est spécialement pour ajouter tous les employés via un fichier excel déjà rempli .");
  AllureUtils.setSeverity("critical");
  AllureUtils.addTags("login", "smoke");

  const loginPage = new LoginPage(page);
  const testPage = new TestPage(page);
 
  // Naviguer vers la page d'accueil et se connecter
  await page.goto("/");
  await loginPage.loginToApplication();
  await expect(page).toHaveTitle(/OrangeHRM/);

  
  // Etapes de test
  await test.step("Accéder à la page Pim et remplir les informations", async () => {
    //await page.pause();
    await testPage.clickPim();
    DataFactoryPhysicalMember.getGenderData();
    console.log(DataFactoryPhysicalMember.getGenderData());  


    await testPage.fillEmployeeData();
    AllureUtils.attachJson("Données utilisateur : ", (testPage.fillEmployeeData));
    

    
    //await page.pause();
  });
});
