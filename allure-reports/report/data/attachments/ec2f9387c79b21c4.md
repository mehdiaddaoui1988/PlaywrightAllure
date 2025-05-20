# Test info

- Name: Gérer un nouvel onglet et revenir à la page principale
- Location: C:\Users\maddaoui\Downloads\playwright-Demo\tests\handlingandTabExample.spec.ts:6:5

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toHaveTitle(expected)

Locator: locator(':root')
Expected string: "Google"
Received string: "404 Not Found"
Call log:
  - expect.toHaveTitle with timeout 5000ms
  - waiting for locator(':root')
    8 × locator resolved to <html>…</html>
      - unexpected value "404 Not Found"

    at C:\Users\maddaoui\Downloads\playwright-Demo\tests\handlingandTabExample.spec.ts:41:19
```

# Page snapshot

```yaml
- heading "Not Found" [level=1]
- paragraph: The requested URL was not found on this server.
- separator
- text: Apache/2.4.41 (Ubuntu) Server at opensource-demo.orangehrmlive.com Port 443
```

# Test source

```ts
   1 | import { test, expect } from "@playwright/test";
   2 | import { AllureUtils } from "../src/utils/allure.utils";
   3 | import  LoginPage from "../src/page-objects/loginPage/LoginPage"
   4 |
   5 |
   6 | test('Gérer un nouvel onglet et revenir à la page principale', async ({ page, context, browser }) => {
   7 |    AllureUtils.initSuite("Automation Project", "OrangeHrm", "Add Employees With excelFiles");
   8 |    AllureUtils.setDescription("Ce test est Pour Gérer un nouvel onglet et revenir à la page principale .");
   9 |    AllureUtils.setSeverity("critical");
  10 |    AllureUtils.addTags("login", "smoke");
  11 |     // Ouvrir la page de test
  12 |     await page.goto('https://sanjaydas9027.github.io/AutomationPractice/');
  13 |
  14 |     // Localiser le bouton "Open Tab" et cliquer dessus
  15 |     const [newPage] = await Promise.all([
  16 |         context.waitForEvent('page'), // Attente de l'ouverture d'un nouvel onglet
  17 |         page.locator('#opentab').click() // Clique sur le bouton Open Tab
  18 |     ]);
  19 |
  20 |     // Attendre que la nouvelle page soit complètement chargée
  21 |     await newPage.waitForLoadState();
  22 |
  23 |     // Vérifier que l'URL est correcte "dans la console"
  24 |     console.log("🎉🎉🎉✨",'Nouvelle URL:', await newPage.url(),"🎇🎉✨✨" );
  25 |
  26 |     // Saisir l'identifiant
  27 |     await newPage.locator("input[name='username']").fill('Admin');
  28 |     
  29 |     // Saisir le mot de passe
  30 |     await newPage.locator("input[type='password']").fill('admin123');
  31 |
  32 |     // Cliquer sur le bouton "Login"
  33 |     await newPage.locator("//button[@type='submit']").click();
  34 |
  35 |     // Attendre un peu pour voir l'action (optionnel)
  36 |     await newPage.waitForTimeout(2000);
  37 |
  38 |     const context2 = await browser.newContext(); // contexte du navigateur
  39 |     const page1 = await context2.newPage(); // premier onglet
  40 |     await page1.goto('www.google.fr');
> 41 |     expect(page1).toHaveTitle("Google");
     |                   ^ Error: Timed out 5000ms waiting for expect(locator).toHaveTitle(expected)
  42 |
  43 |     // Fermer l'onglet après la connexion
  44 |     await newPage.close();
  45 |
  46 |     //await page.pause();
  47 |     // Revenir sur la page principale et vérifier qu'on est bien revenu
  48 |     expect( page.url()).toContain('AutomationPractice');
  49 |     expect( page.locator("//h1[normalize-space(text())='Practice Page']")).toContainText('Practice Page');
  50 |     
  51 |     console.log('Retour à la page principale réussi ✅');
  52 |     //await page.pause();
  53 |
  54 |     
  55 |     
  56 | });
  57 |
```