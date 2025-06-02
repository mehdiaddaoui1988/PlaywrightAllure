# Test info

- Name: Change context
- Location: C:\Users\maddaoui\Downloads\playwright-Demo\tests\playground.spec.ts:4:5

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toHaveTitle(expected)

Locator: locator(':root')
Expected string: "g"
Received string: "Fast and reliable end-to-end testing for modern web apps | Playwright"
Call log:
  - expect.toHaveTitle with timeout 5000ms
  - waiting for locator(':root')
    8 × locator resolved to <html lang="en" dir="ltr" data-theme="light" data-has-hydrated="true" class="plugin-pages plugin-id-default" data-rh="lang,dir,class,data-has-hydrated">…</html>
      - unexpected value "Fast and reliable end-to-end testing for modern web apps | Playwright"

    at C:\Users\maddaoui\Downloads\playwright-Demo\tests\playground.spec.ts:14:23
```

# Page snapshot

```yaml
- dialog "Voordat je verdergaat naar Google Zoeken":
  - img "Google"
  - 'button "Taal: ‪Nederlands‬"':
    - img
    - text: nl
  - link "Inloggen"
  - heading "Voordat je verdergaat naar Google" [level=1]
  - text: We gebruiken
  - link "cookies":
    - /url: https://policies.google.com/technologies/cookies?utm_source=ucbs&hl=nl-BE
  - text: "en gegevens voor het volgende:"
  - list:
    - listitem: Google-services leveren en onderhouden
    - listitem: Uitval bijhouden en bescherming bieden tegen spam, fraude en misbruik
    - listitem: Doelgroepbetrokkenheid en sitestatistieken meten om inzicht te krijgen in hoe onze services worden gebruikt en de kwaliteit van die services te verbeteren
  - text: "Als je Alles accepteren kiest, gebruiken we cookies en gegevens ook voor het volgende:"
  - list:
    - listitem: Nieuwe services ontwikkelen en verbeteren
    - listitem: Advertenties laten zien en de effectiviteit ervan meten
    - listitem: Gepersonaliseerde content laten zien (afhankelijk van je instellingen)
    - listitem: Gepersonaliseerde advertenties laten zien (afhankelijk van je instellingen)
  - text: Als je Alles afwijzen kiest, gebruiken we cookies niet voor deze aanvullende doeleinden. Niet-gepersonaliseerde content wordt beïnvloed door factoren zoals de content die je op dat moment bekijkt, activiteit in je actieve zoeksessie en je locatie. Niet-gepersonaliseerde advertenties worden beïnvloed door de content die je op dat moment bekijkt en je algemene locatie. Gepersonaliseerde content en advertenties kunnen ook relevantere resultaten, aanbevelingen en op jou toegespitste advertenties omvatten die zijn gebaseerd op eerdere activiteit van deze browser, zoals uitgevoerde Google-zoekopdrachten. We gebruiken cookies en gegevens ook om te zorgen dat de functionaliteit geschikt is voor je leeftijd, als dit relevant is. Selecteer Meer opties om meer informatie te bekijken, waaronder over hoe je je privacyinstellingen beheert. Je kunt ook altijd naar g.co/privacytools gaan.
  - button "Alles afwijzen"
  - button "Alles accepteren"
  - link "Meer opties voor personalisatie-instellingen en cookies": Meer opties
  - link "Privacy":
    - /url: https://policies.google.com/privacy?hl=nl-BE&fg=1&utm_source=ucbs
  - link "Voorwaarden":
    - /url: https://policies.google.com/terms?hl=nl-BE&fg=1&utm_source=ucbs
```

# Test source

```ts
   1 | import test, { chromium, expect } from "@playwright/test";
   2 |
   3 |
   4 | test('Change context', async ({  }) => {
   5 |   const browser = await chromium.launch({ headless: false }); 
   6 |   const context = await browser.newContext(); 
   7 |   const page1 = await context.newPage(); 
   8 |
   9 |   await page1.goto('https://google.com');
  10 |   
  11 |
  12 |   const page2 = await context.newPage(); 
  13 |   await page2.goto('https://playwright.dev');
> 14 |   await expect(page2).toHaveTitle("g");
     |                       ^ Error: Timed out 5000ms waiting for expect(locator).toHaveTitle(expected)
  15 |   });
```