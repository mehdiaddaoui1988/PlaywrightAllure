# Test info

- Name: Test automatisé Playwright
- Location: C:\Users\maddaoui\Downloads\playwright-Demo\tests\newWindowSelectCheckboxRadiobutton.spec.ts:4:5

# Error details

```
Error: Timed out 10000ms waiting for expect(locator).toBeVisible()

Locator: locator('//h1[normalize-space(text())=\'QA Click Academy\']')
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 10000ms
  - waiting for locator('//h1[normalize-space(text())=\'QA Click Academy\']')

    at C:\Users\maddaoui\Downloads\playwright-Demo\tests\newWindowSelectCheckboxRadiobutton.spec.ts:52:24
```

# Page snapshot

```yaml
- banner:
  - navigation:
    - list:
      - listitem:
        - link "Home":
          - /url: index.html
- heading "Practice Page" [level=1]
- group "Radio Button Example":
  - text: Radio Button Example
  - radio
  - text: Radio1
  - radio [checked]
  - text: Radio2
  - radio
  - text: Radio3
- group "Suggession Class Example":
  - text: Suggession Class Example
  - textbox "Type to Select Countries": France
- group "Dropdown Example":
  - text: Dropdown Example
  - combobox:
    - option "Select"
    - option "Option1"
    - option "Option2"
    - option "Option3" [selected]
- group "Checkbox Example":
  - text: Checkbox Example
  - checkbox [checked]
  - text: Option1
  - checkbox
  - text: Option2
  - checkbox [checked]
  - text: Option3
- group "Switch Window Example":
  - text: Switch Window Example
  - button "Open Window"
- group "Switch Tab Example":
  - text: Switch Tab Example
  - link "Open Tab":
    - /url: https://opensource-demo.orangehrmlive.com/
- group "Switch To Alert Example":
  - text: Switch To Alert Example
  - textbox "Enter Your Name"
  - button "Alert"
  - button "Confirm"
  - button "Prompt"
  - paragraph
- group "Web Table Example":
  - text: Web Table Example
  - table:
    - rowgroup:
      - row "Instructor Course Price":
        - cell "Instructor"
        - cell "Course"
        - cell "Price"
      - row "SudoZap Selenium Webdriver with Java Basics + Advanced + Interview Guide 30":
        - cell "SudoZap"
        - cell "Selenium Webdriver with Java Basics + Advanced + Interview Guide"
        - cell "30"
      - row "SudoZap Learn SQL in Practical + Database Testing from Scratch 25":
        - cell "SudoZap"
        - cell "Learn SQL in Practical + Database Testing from Scratch"
        - cell "25"
      - row "SudoZap Appium (Selenium) - Mobile Automation Testing from Scratch 30":
        - cell "SudoZap"
        - cell "Appium (Selenium) - Mobile Automation Testing from Scratch"
        - cell "30"
      - row "SudoZap WebSecurity Testing for Beginners-QA knowledge to next level 20":
        - cell "SudoZap"
        - cell "WebSecurity Testing for Beginners-QA knowledge to next level"
        - cell "20"
      - row "SudoZap Learn JMETER from Scratch - (Performance + Load) Testing Tool 25":
        - cell "SudoZap"
        - cell "Learn JMETER from Scratch - (Performance + Load) Testing Tool"
        - cell "25"
      - row "SudoZap WebServices / REST API Testing with SoapUI 35":
        - cell "SudoZap"
        - cell "WebServices / REST API Testing with SoapUI"
        - cell "35"
      - row "SudoZap QA Expert Course :Software Testing + Bugzilla + SQL + Agile 25":
        - cell "SudoZap"
        - cell "QA Expert Course :Software Testing + Bugzilla + SQL + Agile"
        - cell "25"
      - row "SudoZap Master Selenium Automation in simple Python Language 25":
        - cell "SudoZap"
        - cell "Master Selenium Automation in simple Python Language"
        - cell "25"
      - row "SudoZap Advanced Selenium Framework Pageobject, TestNG, Maven, Jenkins,C 20":
        - cell "SudoZap"
        - cell "Advanced Selenium Framework Pageobject, TestNG, Maven, Jenkins,C"
        - cell "20"
      - row "SudoZap Write effective QA Resume that will turn to interview call 0":
        - cell "SudoZap"
        - cell "Write effective QA Resume that will turn to interview call"
        - cell "0"
- group "Element Displayed Example":
  - text: Element Displayed Example
  - button "Hide"
  - button "Show"
  - textbox "Hide/Show Example"
- group "Web Table Fixed header":
  - text: Web Table Fixed header
  - table:
    - rowgroup:
      - row "Name Position City Amount":
        - cell "Name"
        - cell "Position"
        - cell "City"
        - cell "Amount"
    - rowgroup:
      - row "Alex Engineer Chennai 28":
        - cell "Alex"
        - cell "Engineer"
        - cell "Chennai"
        - cell "28"
      - row "Ben Mechanic Bengaluru 23":
        - cell "Ben"
        - cell "Mechanic"
        - cell "Bengaluru"
        - cell "23"
      - row "Dwayne Manager Kolkata 48":
        - cell "Dwayne"
        - cell "Manager"
        - cell "Kolkata"
        - cell "48"
      - row "Ivory Receptionist Chennai 18":
        - cell "Ivory"
        - cell "Receptionist"
        - cell "Chennai"
        - cell "18"
      - row "Jack Engineer Pune 32":
        - cell "Jack"
        - cell "Engineer"
        - cell "Pune"
        - cell "32"
      - row "Joe Postman Chennai 46":
        - cell "Joe"
        - cell "Postman"
        - cell "Chennai"
        - cell "46"
      - row "Raymond Businessman Mumbai 37":
        - cell "Raymond"
        - cell "Businessman"
        - cell "Mumbai"
        - cell "37"
      - row "Ronaldo Sportsman Chennai 31":
        - cell "Ronaldo"
        - cell "Sportsman"
        - cell "Chennai"
        - cell "31"
      - row "Smith Cricketer Delhi 33":
        - cell "Smith"
        - cell "Cricketer"
        - cell "Delhi"
        - cell "33"
  - text: "Total Amount Collected: 296"
- group "Mouse Hover Example":
  - text: Mouse Hover Example
  - button "Mouse Hover"
- group "iFrame Example":
  - text: iFrame Example
  - iframe
- contentinfo:
  - paragraph:
    - text: Powered by
    - strong: Sudozap
- status: France
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 | import { AllureUtils } from "../src/utils/allure.utils";
   3 |
   4 | test('Test automatisé Playwright', async ({ page, context }) => {
   5 |   AllureUtils.initSuite("Automation Project", "OrangeHrm", "New window");
   6 |   AllureUtils.setDescription("Ce test a pour but d'ouvrire une nouvelle fenêtre et maîtriser les checkBox / buton radio .");
   7 |   AllureUtils.setSeverity("critical");
   8 |   AllureUtils.addTags("login", "smoke");
   9 |
  10 |   // Accéder au site de test
  11 |   await page.goto('https://sanjaydas9027.github.io/AutomationPractice/');
  12 |
  13 |   // Cliquer sur le bouton radio "Radio2"
  14 |   const radio2 = page.locator("input[value='radio2']");
  15 |   await radio2.check();
  16 |   await expect(radio2).toBeChecked();
  17 |
  18 |   // Saisir "FRANCE" dans le champ "Suggession Class Example"
  19 |   const suggestionInput = page.locator("#autocomplete");
  20 |   await suggestionInput.fill('FRANCE');
  21 |   await page.locator(".ui-menu-item div", { hasText: 'France' }).first().click();
  22 |
  23 |   await expect(suggestionInput).toHaveValue('France');
  24 |
  25 |   // Sélectionner l'option 3 dans le menu déroulant
  26 |   const dropdown = page.locator("#dropdown-class-example");
  27 |   await dropdown.selectOption({ value: 'option3' });
  28 |   await expect(dropdown).toHaveValue('option3');
  29 |
  30 |   // Cocher la checkbox option 1 et option 3
  31 |   const checkbox1 = page.locator("#checkBoxOption1");
  32 |   const checkbox3 = page.locator("#checkBoxOption3");
  33 |   await checkbox1.check();
  34 |   await checkbox3.check();
  35 |   await expect(checkbox1).toBeChecked();
  36 |   await expect(checkbox3).toBeChecked();
  37 |
  38 |   // Ouvrir une nouvelle fenêtre sur "Open Window"
  39 |   const [newPage] = await Promise.all([
  40 |     context.waitForEvent('page'), // Attendre l'ouverture de la nouvelle page
  41 |     page.locator("#openwindow").click()
  42 |   ]);
  43 |   await newPage.waitForLoadState();
  44 |
  45 |   // Cliquer sur le bouton "Access all our Courses"
  46 |   const courseButton = newPage.locator("(//a[@class='main-btn'])[1]");
  47 |   await courseButton.click();
  48 |
  49 |   // Vérifier que le texte "QA Click Academy" est bien présent
  50 |   const qaText = newPage.locator("//h1[normalize-space(text())='QA Click Academy']");
  51 |   await newPage.waitForLoadState('load');
> 52 |   await expect(qaText).toBeVisible({ timeout: 10000 });
     |                        ^ Error: Timed out 10000ms waiting for expect(locator).toBeVisible()
  53 |   //await page.pause();
  54 |   // Fermer la nouvelle fenêtre et revenir à l'ancienne
  55 |   await newPage.close();
  56 |   
  57 |   // Vérifier que toutes les actions précédentes sont bien en place sur la première page
  58 |   await expect(radio2).toBeChecked();
  59 |   await expect(suggestionInput).toHaveValue('France');
  60 |   //await page.pause();
  61 |   await expect(dropdown).toHaveValue('option3');
  62 |   await expect(checkbox1).toBeChecked();
  63 |   await expect(checkbox3).toBeChecked();
  64 | });
  65 |
```