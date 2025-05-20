import { test, expect } from "@playwright/test";
import { AllureUtils } from "../src/utils/allure.utils";
import  LoginPage from "../src/page-objects/loginPage/LoginPage"


test('Gérer un nouvel onglet et revenir à la page principale', async ({ page, context, browser }) => {
   AllureUtils.initSuite("Automation Project", "OrangeHrm", "Add Employees With excelFiles");
   AllureUtils.setDescription("Ce test est Pour Gérer un nouvel onglet et revenir à la page principale .");
   AllureUtils.setSeverity("critical");
   AllureUtils.addTags("login", "smoke");
    // Ouvrir la page de test
    await page.goto('https://sanjaydas9027.github.io/AutomationPractice/');

    // Localiser le bouton "Open Tab" et cliquer dessus
    const [newPage] = await Promise.all([
        context.waitForEvent('page'), // Attente de l'ouverture d'un nouvel onglet
        page.locator('#opentab').click() // Clique sur le bouton Open Tab
    ]);

    // Attendre que la nouvelle page soit complètement chargée
    await newPage.waitForLoadState();

    // Vérifier que l'URL est correcte "dans la console"
    console.log("🎉🎉🎉✨",'Nouvelle URL:', await newPage.url(),"🎇🎉✨✨" );

    // Saisir l'identifiant
    await newPage.locator("input[name='username']").fill('Admin');
    
    // Saisir le mot de passe
    await newPage.locator("input[type='password']").fill('admin123');

    // Cliquer sur le bouton "Login"
    await newPage.locator("//button[@type='submit']").click();

    // Attendre un peu pour voir l'action (optionnel)
    await newPage.waitForTimeout(2000);

    
    /*const context2 = await browser.newContext(); // contexte du navigateur
    const page1 = await context2.newPage(); // premier onglet
    await page1.goto('www.google.fr');
    expect(page1).toHaveTitle("Google");*/

    // Fermer l'onglet après la connexion
    await newPage.close();

    //await page.pause();
    // Revenir sur la page principale et vérifier qu'on est bien revenu
    expect( page.url()).toContain('AutomationPractice');
    expect( page.locator("//h1[normalize-space(text())='Practice Page']")).toContainText('Practice Page');
    
    console.log('Retour à la page principale réussi ✅');
    //await page.pause();

    
    
});
