# Test info

- Name: Login and add all employees from file Excel
- Location: C:\Users\maddaoui\Downloads\playwright-Demo\tests\addEmployee.spec.ts:59:5

# Error details

```
Error: page.screenshot: Test timeout of 30000ms exceeded.
Call log:
  - taking page screenshot
  - waiting for fonts to load...
  - fonts loaded

    at AllureUtils.attachScreenshot (C:\Users\maddaoui\Downloads\playwright-Demo\src\utils\allure.utils.ts:51:35)
    at C:\Users\maddaoui\Downloads\playwright-Demo\tests\addEmployee.spec.ts:91:25
    at C:\Users\maddaoui\Downloads\playwright-Demo\tests\addEmployee.spec.ts:80:5
```

# Page snapshot

```yaml
- complementary:
  - navigation "Sidepanel":
    - link "client brand banner":
      - /url: https://www.orangehrm.com/
      - img "client brand banner"
    - textbox "Search"
    - button ""
    - separator
    - list:
      - listitem:
        - link "Admin":
          - /url: /web/index.php/admin/viewAdminModule
      - listitem:
        - link "PIM":
          - /url: /web/index.php/pim/viewPimModule
      - listitem:
        - link "Leave":
          - /url: /web/index.php/leave/viewLeaveModule
      - listitem:
        - link "Time":
          - /url: /web/index.php/time/viewTimeModule
      - listitem:
        - link "Recruitment":
          - /url: /web/index.php/recruitment/viewRecruitmentModule
      - listitem:
        - link "My Info":
          - /url: /web/index.php/pim/viewMyDetails
      - listitem:
        - link "Performance":
          - /url: /web/index.php/performance/viewPerformanceModule
      - listitem:
        - link "Dashboard":
          - /url: /web/index.php/dashboard/index
      - listitem:
        - link "Directory":
          - /url: /web/index.php/directory/viewDirectory
      - listitem:
        - link "Maintenance":
          - /url: /web/index.php/maintenance/viewMaintenanceModule
      - listitem:
        - link "Claim":
          - /url: /web/index.php/claim/viewClaimModule
          - img
          - text: Claim
      - listitem:
        - link "Buzz":
          - /url: /web/index.php/buzz/viewBuzz
- banner:
  - heading "PIM" [level=6]
  - link "Upgrade":
    - /url: https://orangehrm.com/open-source/upgrade-to-advanced
    - button "Upgrade"
  - list:
    - listitem:
      - img "profile picture"
      - paragraph: santhosh V
      - text: 
  - navigation "Topbar Menu":
    - list:
      - listitem: Configuration 
      - listitem:
        - link "Employee List":
          - /url: "#"
      - listitem:
        - link "Add Employee":
          - /url: "#"
      - listitem:
        - link "Reports":
          - /url: "#"
      - button ""
- heading "Add Employee" [level=6]
- separator
- button "Choose File"
- img "profile picture"
- button ""
- paragraph: "Accepts jpg, .png, .gif up to 1MB. Recommended dimensions: 200px X 200px"
- text: Employee Full Name*
- textbox "First Name": Alice
- textbox "Middle Name": QA
- textbox "Last Name": Smith
- text: Employee Id
- textbox: "0480"
- separator
- paragraph: Create Login Details
- checkbox
- separator
- paragraph: "* Required"
- button "Cancel"
- button "Save"
- paragraph: OrangeHRM OS 5.7
- paragraph:
  - text: © 2005 - 2025
  - link "OrangeHRM, Inc":
    - /url: http://www.orangehrm.com
  - text: . All rights reserved.
- text: 
- paragraph: Success
- paragraph: Successfully Saved
- button "×"
```

# Test source

```ts
   1 | import { allure } from "allure-playwright";
   2 | import { Page } from "@playwright/test";
   3 |
   4 | export class AllureUtils {
   5 |   /**
   6 |    * Initialise une suite Allure structurée : parent, suite, sous-suite
   7 |    */
   8 |   static initSuite(parent: string, suite: string, subSuite?: string) {
   9 |     allure.parentSuite(parent);
  10 |     allure.suite(suite);
  11 |     if (subSuite) {
  12 |       allure.subSuite(subSuite);
  13 |     }
  14 |     
  15 |   }
  16 |
  17 |   /**
  18 |    * Ajoute une description lisible pour le test
  19 |    */
  20 |   static setDescription(text: string) {
  21 |     allure.description(text);
  22 |     
  23 |   }
  24 |
  25 |   /**
  26 |    * Ajoute une sévérité : blocker, critical, normal, minor, trivial
  27 |    */
  28 |   static setSeverity(level: 'blocker' | 'critical' | 'normal' | 'minor' | 'trivial') {
  29 |     allure.severity(level);
  30 |   }
  31 |
  32 |   /**
  33 |    * Ajoute un ou plusieurs tags personnalisés
  34 |    */
  35 |   static addTags(...tags: string[]) {
  36 |     tags.forEach(tag => allure.tag(tag));
  37 |   }
  38 |
  39 |   /**
  40 |    * Ajoute une pièce jointe JSON avec formatage lisible
  41 |    */
  42 |   static attachJson(name: string, data: unknown) {
  43 |     const content = JSON.stringify(data, null, 2);
  44 |     allure.attachment(name, content, "application/json");
  45 |   }
  46 |
  47 |   /**
  48 |    * Ajoute une capture d'écran (png)
  49 |    */
  50 |   static async attachScreenshot(name: string, page: Page) {
> 51 |     const screenshot = await page.screenshot();
     |                                   ^ Error: page.screenshot: Test timeout of 30000ms exceeded.
  52 |     allure.attachment(name, screenshot, "image/png");
  53 |   }
  54 |
  55 |   /**
  56 |    * Ajoute une capture d’écran uniquement en cas d’erreur
  57 |    */
  58 |   static async attachScreenshotOnFailure(name: string, page: Page, condition: boolean) {
  59 |     if (condition) {
  60 |       await this.attachScreenshot(name, page);
  61 |     }
  62 |   }
  63 |
  64 |   /**
  65 |    * Ajoute une pièce jointe textuelle
  66 |    */
  67 |   static attachText(name: string, text: string) {
  68 |     allure.attachment(name, text, "text/plain");
  69 |   }
  70 |
  71 |   /**
  72 |    * Ajoute une pièce jointe HTML (utile pour debug DOM par ex.)
  73 |    */
  74 |   static attachHtml(name: string, html: string) {
  75 |     allure.attachment(name, html, "text/html");
  76 |   }
  77 |
  78 |   /**
  79 |    * Ajoute un lien externe (ex: lien Jira, documentation, ticket)
  80 |    */
  81 |   static addLink(name: string, url: string, type: 'issue' | 'tms' | 'link' = 'link') {
  82 |     allure.link(url, name, type);
  83 |   }
  84 |
  85 |   /**
  86 |    * Marqueur personnalisable (label générique)
  87 |    */
  88 |   static addLabel(name: string, value: string) {
  89 |     allure.label(name, value);
  90 |   }
  91 |   
  92 | }
  93 |
```