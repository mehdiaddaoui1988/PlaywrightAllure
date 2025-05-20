# Test info

- Name: has title
- Location: C:\Users\maddaoui\Downloads\playwright-Demo\tests\playground.spec.ts:4:5

# Error details

```
Error: page.goto: net::ERR_NAME_NOT_RESOLVED at https://example.com/
Call log:
  - navigating to "https://example.com/", waiting until "load"

    at C:\Users\maddaoui\Downloads\playwright-Demo\tests\playground.spec.ts:9:15
```

# Page snapshot

```yaml
- heading "Ce site est inaccessible" [level=1]
- paragraph: Vérifiez si l'adresse example.com est correcte.
- paragraph
- list:
  - listitem:
    - text: S'il n'y a pas d'erreur, essayez de
    - link "faire un diagnostic réseau Windows":
      - /url: javascript:diagnoseErrors()
    - text: .
- text: DNS_PROBE_FINISHED_NXDOMAIN
- button "Actualiser"
```

# Test source

```ts
   1 | import test, { chromium } from "@playwright/test";
   2 |
   3 |
   4 | test('has title', async ({  }) => {
   5 |   const browser = await chromium.launch({ headless: false }); 
   6 |   const context = await browser.newContext(); 
   7 |   const page1 = await context.newPage(); 
   8 |
>  9 |   await page1.goto('https://example.com');
     |               ^ Error: page.goto: net::ERR_NAME_NOT_RESOLVED at https://example.com/
  10 |
  11 |   const page2 = await context.newPage(); 
  12 |   await page2.goto('https://playwright.dev');
  13 |   });
```