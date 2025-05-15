import { test, expect } from '../fixtures/fixtureLogin';
import { AllureUtils } from '../src/utils/allure.utils';
import userQa from '../src/test-data/qa/userQa';
import { allure } from 'allure-playwright';
import { DataFactory } from '../src/utils/DataFactory';
import { DataFactoryPhysicalMember } from '../src/utils/DataFactoryPhysicalMemberFirst';

test.describe('Authentification OrangeHRM avec l\'utilisation des Fixtures ', () => {
  test('Connexion avec identifiants valides',  {tag: ['@login', '@favorite'], annotation: [
        { type: 'Jira Story', 
          description: 'https://jira.com/SCRUM-2' },
      ],
    }, 
    async ({ loginPage, page }) => {
      AllureUtils.initSuite('Automation Project', 'OrangeHrm', 'Authentification');
      AllureUtils.setDescription('Ce test vérifie la connexion avec des identifiants valides via fixture LoginPage.');
      AllureUtils.setSeverity('critical');
      AllureUtils.addTags('login', 'smoke');

      await page.goto('/');

      await test.step('1. Remplir le nom d’utilisateur', async () => {
        await page.pause();
        await loginPage.fillUsername();
        AllureUtils.attachJson('Nom utilisateur', userQa.user_auth.login);
        allure.attachment('Prénom aléatoire (DataFactory)', JSON.stringify(DataFactory.getFirstName1(), null, 2), 'application/json');
      });

      await test.step('2. Remplir le mot de passe', async () => {
        await loginPage.fillPassword();
        AllureUtils.attachJson('Mot de passe', userQa.user_auth.password);
      });

      await test.step('3. Cliquer sur Connexion', async () => {
        await loginPage.clickLoginButton();
        await AllureUtils.attachScreenshot('Dashboard', page);
      });

      await test.step('4. Vérifier que le dashboard est affiché', async () => {
        await expect(page).toHaveTitle(/OrangeHRM/);
        await AllureUtils.attachScreenshot('Dashboard', page);
      });
    }
  );

  test('Connexion rapide avec méthode loginToApplication()', async ({ loginPage, page }) => {
    await page.goto('/');
    await loginPage.loginToApplication();
    await expect(page).toHaveTitle(/OrangeHRM/);
  });
});
