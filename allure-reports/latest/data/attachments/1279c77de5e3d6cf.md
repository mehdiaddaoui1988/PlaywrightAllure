# Test info

- Name: The member logining 
- Location: C:\Users\maddaoui\Downloads\playwright-Demo\tests\loginMember.spec.ts:59:5

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toHaveTitle(expected)

Locator: locator(':root')
Expected pattern: /OrangeHRM/
Received string:  "opensource-demo.orangehrmlive.com"
Call log:
  - expect.toHaveTitle with timeout 5000ms
  - waiting for locator(':root')
    8 × locator resolved to <html dir="ltr" lang="fr">…</html>
      - unexpected value "opensource-demo.orangehrmlive.com"

    at C:\Users\maddaoui\Downloads\playwright-Demo\tests\loginMember.spec.ts:64:24
```

# Page snapshot

```yaml
- heading "Cette page ne fonctionne pas" [level=1]
- paragraph:
  - text: Impossible de traiter cette demande via
  - strong: opensource-demo.orangehrmlive.com
  - text: à l'heure actuelle.
- text: HTTP ERROR 500
```

# Test source

```ts
   1 | import { test, expect } from "@playwright/test";
   2 | import LoginPage from "../src/page-objects/loginPage/LoginPage";
   3 | import userQa from "../src/test-data/qa/userQa";
   4 | import { AllureUtils } from "../src/utils/allure.utils";
   5 | import { allure } from "allure-playwright";
   6 | import { DataFactoryPhysicalMember } from "../src/utils/DataFactoryPhysicalMemberFirst";
   7 | import { DataFactory } from "../src/utils/DataFactory";
   8 |
   9 | test("Connexion utilisateur valide", { tag: ["@login", "@favorite"] , annotation:[{type:"Jira Story", description:"https://www.atlassian.net/jira/software/projects/scrum/boards/1/backlog?selectedIssue=SCRUM-1"}]} , async ({ page }) => {
  10 |   AllureUtils.initSuite("Automation Project", "OrangeHrm", "Authentification");
  11 |   AllureUtils.setDescription("Ce test vérifie la connexion avec des identifiants valides.");
  12 |   AllureUtils.setSeverity("critical");
  13 |   AllureUtils.addTags("login", "smoke");
  14 |   // A revoir plus tard
  15 |   // await allure.parentSuite("Automation Project");
  16 |   // await allure.suite("OrangeHrm");
  17 |   // await allure.subSuite("Authentification");
  18 |   const loginPage = new LoginPage(page);
  19 |
  20 |   await page.goto("/");
  21 |
  22 |   await test.step("1. Saisir le nom d'utilisateur", async () => {
  23 |     //await loginPage.fillUsername();
  24 |     //await loginPage.fillField('username', userQa.user_auth.login)
  25 |     await loginPage.fillUsername(userQa.user_auth.login);
  26 |     //await page.pause();
  27 |     // await allure.attachment("User data",JSON.stringify("TEST-TEST", null, 2),"application/json");
  28 |     AllureUtils.attachJson("Données utilisateur", userQa.user_auth.login);
  29 |     //await allure.attachment("User data", JSON.stringify(userQa.user_auth.login, null, 2),"application/json" );
  30 |
  31 |     await allure.attachment("User Data First Name", JSON.stringify(DataFactoryPhysicalMember.getFirstName("Male"), null, 2),
  32 |       "application/json"
  33 |     );
  34 |     await allure.attachment("First name random",JSON.stringify(DataFactory.getFirstName1(), null, 2),"application/json");
  35 |
  36 |    //await page.pause();
  37 |   });
  38 |   await test.step("2. Saisir le mot de passe", async () => {
  39 |     await loginPage.fillPassword();
  40 |     AllureUtils.attachJson("Mot de passe", userQa.user_auth.password);
  41 |     //await allure.attachment("User Data",JSON.stringify(userQa.user_auth.password, null, 2),"application/json");
  42 |   });
  43 |   await test.step("3. Cliquer sur Connexion", async () => {
  44 |     //await page.pause();
  45 |     await loginPage.clickLoginButton();
  46 |   });
  47 |
  48 |   await test.step("4. Vérifier que le dashboard est affiché", async () => {
  49 |     
  50 |     await expect(page).toHaveTitle(/OrangeHRM/);
  51 |     await page.waitForTimeout(5000 ); 
  52 |     await page.screenshot({ path: 'screenshot-dashboard.png' });
  53 |     await AllureUtils.attachScreenshot("Dashboard", page);
  54 |     await allure.attachment("Dashboard", await page.screenshot(), "image/png");
  55 |   }); 
  56 |   //await page.pause();
  57 | });
  58 |
  59 | test("The member logining ",{ tag: ["@logining", "@favorite"] },async ({ page }) => {
  60 |     const loginPage = new LoginPage(page);
  61 |
  62 |     await page.goto("/");
  63 |     await loginPage.loginToApplication();
> 64 |     await expect(page).toHaveTitle(/OrangeHRM/);
     |                        ^ Error: Timed out 5000ms waiting for expect(locator).toHaveTitle(expected)
  65 |   }
  66 | );
  67 |
```