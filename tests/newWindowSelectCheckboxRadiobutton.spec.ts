import { test, expect } from '@playwright/test';
import { AllureUtils } from "../src/utils/allure.utils";

test('Test automatisé Playwright', async ({ page, context }) => {
  AllureUtils.initSuite("Automation Project", "OrangeHrm", "New window");
  AllureUtils.setDescription("Ce test a pour but d'ouvrire une nouvelle fenêtre et maîtriser les checkBox / buton radio .");
  AllureUtils.setSeverity("critical");
  AllureUtils.addTags("login", "smoke");

  // Accéder au site de test
  await page.goto('https://sanjaydas9027.github.io/AutomationPractice/');

  // Cliquer sur le bouton radio "Radio2"
  const radio2 = page.locator("input[value='radio2']");
  await radio2.check();
  await expect(radio2).toBeChecked();

  // Saisir "FRANCE" dans le champ "Suggession Class Example"
  const suggestionInput = page.locator("#autocomplete");
  await suggestionInput.fill('FRANCE');
  await page.locator(".ui-menu-item div", { hasText: 'France' }).first().click();

  await expect(suggestionInput).toHaveValue('France');

  // Sélectionner l'option 3 dans le menu déroulant
  const dropdown = page.locator("#dropdown-class-example");
  await dropdown.selectOption({ value: 'option3' });
  await expect(dropdown).toHaveValue('option3');

  // Cocher la checkbox option 1 et option 3
  const checkbox1 = page.locator("#checkBoxOption1");
  const checkbox3 = page.locator("#checkBoxOption3");
  await checkbox1.check();
  await checkbox3.check();
  await expect(checkbox1).toBeChecked();
  await expect(checkbox3).toBeChecked();

  // Ouvrir une nouvelle fenêtre sur "Open Window"
  const [newPage] = await Promise.all([
    context.waitForEvent('page'), // Attendre l'ouverture de la nouvelle page
    page.locator("#openwindow").click()
  ]);
  await newPage.waitForLoadState();

  // Cliquer sur le bouton "Access all our Courses"
  const courseButton = newPage.locator("(//a[@class='main-btn'])[1]");
  await courseButton.click();

  // Vérifier que le texte "QA Click Academy" est bien présent
  const qaText = newPage.locator("//h1[normalize-space(text())='QA Click Academy']");
  await newPage.waitForLoadState('load');
  await expect(qaText).toBeVisible({ timeout: 10000 });
  //await page.pause();
  // Fermer la nouvelle fenêtre et revenir à l'ancienne
  await newPage.close();
  
  // Vérifier que toutes les actions précédentes sont bien en place sur la première page
  await expect(radio2).toBeChecked();
  await expect(suggestionInput).toHaveValue('France');
  //await page.pause();
  await expect(dropdown).toHaveValue('option3');
  await expect(checkbox1).toBeChecked();
  await expect(checkbox3).toBeChecked();
});
