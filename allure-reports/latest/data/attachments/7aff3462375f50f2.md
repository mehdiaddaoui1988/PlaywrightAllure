# Test info

- Name: Reusing authenticated context
- Location: C:\Users\maddaoui\Downloads\playwright-Demo\tests\browserContextPageSwitch.spec.ts:114:1

# Error details

```
Error: page.goto: net::ERR_NAME_NOT_RESOLVED at https://example.com/login
Call log:
  - navigating to "https://example.com/login", waiting until "load"

    at C:\Users\maddaoui\Downloads\playwright-Demo\tests\browserContextPageSwitch.spec.ts:120:19
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
   20 |     locale: 'fr-FR', // French locale
   21 |   });
   22 |   
   23 |   // 2. Create context in Firefox
   24 |   console.log('Creating context in Firefox...');
   25 |   const userCContext = await firefox.newContext({
   26 |     viewport: { width: 1366, height: 768 },
   27 |     geolocation: { latitude: 48.8584, longitude: 2.2945 }, // Paris
   28 |     permissions: ['geolocation'],
   29 |   });
   30 |   
   31 |   // CONTEXT LEVEL OPERATIONS
   32 |   
   33 |   // 3. Create pages in different contexts
   34 |   console.log('Creating multiple pages in different contexts...');
   35 |   const pageA1 = await userAContext.newPage();
   36 |   const pageA2 = await userAContext.newPage();
   37 |   const pageB1 = await userBContext.newPage();
   38 |   const pageC1 = await userCContext.newPage();
   39 |   
   40 |   // 4. Navigate to different sites in different contexts
   41 |   await pageA1.goto('https://example.com');
   42 |   await pageA2.goto('https://playwright.dev');
   43 |   await pageB1.goto('https://example.com'); // Same site, different context (different user agent, viewport)
   44 |   await pageC1.goto('https://maps.google.com'); // Different browser with geolocation enabled
   45 |   
   46 |   // PAGE LEVEL OPERATIONS
   47 |   
   48 |   // 5. Interact with pages
   49 |   await pageA1.fill('input[name="search"]', 'Playwright');
   50 |   await pageA1.click('button[type="submit"]');
   51 |   await pageA1.waitForSelector('.results');
   52 |   
   53 |   // 6. Switch to a different page in the same context
   54 |   console.log('Switching to pageA2 in userAContext...');
   55 |   await pageA2.bringToFront(); // Make this page active
   56 |   const title = await pageA2.title();
   57 |   console.log(`Page title: ${title}`);
   58 |   
   59 |   // 7. Switch to a different context (different user) and verify isolation
   60 |   console.log('Switching to userB context...');
   61 |   // Check if the context has different settings
   62 |   const userAgent = await pageB1.evaluate(() => navigator.userAgent);
   63 |   console.log(`User agent in context B: ${userAgent}`);
   64 |   
   65 |   // 8. Demonstrate context isolation (cookies not shared)
   66 |   await pageA1.goto('https://example.com');
   67 |   await pageA1.evaluate(() => {
   68 |     document.cookie = 'user=Alice; path=/';
   69 |   });
   70 |   
   71 |   // This page is in a different context so it won't have the cookie
   72 |   const cookieB = await pageB1.evaluate(() => document.cookie);
   73 |   console.log(`Cookies in context B: "${cookieB}"`); // Should be empty
   74 |   
   75 |   // 9. Create a new page in an existing context
   76 |   console.log('Creating a new page in userC context...');
   77 |   const pageC2 = await userCContext.newPage();
   78 |   await pageC2.goto('https://example.com/about');
   79 |   
   80 |   // 10. Switch between browsers
   81 |   console.log('Switching to Firefox browser...');
   82 |   // We're now working with the Firefox browser instead of Chromium
   83 |   const geolocation = await pageC1.evaluate(() => {
   84 |     return new Promise(resolve => {
   85 |       navigator.geolocation.getCurrentPosition(
   86 |         position => resolve({
   87 |           lat: position.coords.latitude,
   88 |           lng: position.coords.longitude
   89 |         }),
   90 |         error => resolve({ error: error.message })
   91 |       );
   92 |     });
   93 |   });
   94 |   console.log('Geolocation in Firefox:', geolocation);
   95 |   
   96 |   // 11. Close specific pages
   97 |   console.log('Closing specific pages...');
   98 |   await pageA2.close();
   99 |   await pageC2.close();
  100 |   
  101 |   // 12. Close contexts
  102 |   console.log('Closing contexts...');
  103 |   await userAContext.close();
  104 |   await userBContext.close();
  105 |   await userCContext.close();
  106 |   
  107 |   // 13. Close browsers
  108 |   console.log('Closing browsers...');
  109 |   await chromium.close();
  110 |   await firefox.close();
  111 | });
  112 |
  113 | // Example of reusing contexts for authentication
  114 | test('Reusing authenticated context', async ({ browser }) => {
  115 |   // Create a context for logged-in user
  116 |   const loggedInContext = await browser.newContext();
  117 |   const loginPage = await loggedInContext.newPage();
  118 |   
  119 |   // Perform login
> 120 |   await loginPage.goto('https://example.com/login');
      |                   ^ Error: page.goto: net::ERR_NAME_NOT_RESOLVED at https://example.com/login
  121 |   await loginPage.fill('input[name="username"]', 'user@example.com');
  122 |   await loginPage.fill('input[name="password"]', 'password123');
  123 |   await loginPage.click('button[type="submit"]');
  124 |   await loginPage.waitForNavigation();
  125 |   
  126 |   // Verify we're logged in
  127 |   const isLoggedIn = await loginPage.isVisible('.user-profile');
  128 |   expect(isLoggedIn).toBeTruthy();
  129 |   
  130 |   // Now use the same authenticated context for different pages
  131 |   const profilePage = await loggedInContext.newPage();
  132 |   await profilePage.goto('https://example.com/profile');
  133 |   // This page should already be authenticated because it shares the context
  134 |   
  135 |   const dashboardPage = await loggedInContext.newPage();
  136 |   await dashboardPage.goto('https://example.com/dashboard');
  137 |   // This page should also be authenticated
  138 |   
  139 |   // Close pages but keep context alive
  140 |   await loginPage.close();
  141 |   await profilePage.close();
  142 |   
  143 |   // Navigate to a restricted page with the dashboard page
  144 |   await dashboardPage.goto('https://example.com/settings');
  145 |   // Still authenticated
  146 |   
  147 |   await loggedInContext.close();
  148 | });
```