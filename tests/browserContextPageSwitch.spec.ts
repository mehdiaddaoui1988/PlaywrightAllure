// @ts-check
const { test, expect, chromium, firefox } = require('@playwright/test');


test('Working with multiple browsers, contexts, and pages', async () => { 
  
  // BROWSER LEVEL OPERATIONS
  console.log('Working with multiple browser types');
  
  // 1. Create contexts in the Chromium browser
  console.log('Creating contexts in Chromium...');
  const userAContext = await chromium.newContext({
    viewport: { width: 1280, height: 720 },
    userAgent: 'Mozilla/5.0 Custom User Agent A',
  });
  
  const userBContext = await chromium.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 Custom User Agent B',
    locale: 'fr-FR', // French locale
  });
  
  // 2. Create context in Firefox
  console.log('Creating context in Firefox...');
  const userCContext = await firefox.newContext({
    viewport: { width: 1366, height: 768 },
    geolocation: { latitude: 48.8584, longitude: 2.2945 }, // Paris
    permissions: ['geolocation'],
  });
  
  // CONTEXT LEVEL OPERATIONS
  
  // 3. Create pages in different contexts
  console.log('Creating multiple pages in different contexts...');
  const pageA1 = await userAContext.newPage();
  const pageA2 = await userAContext.newPage();
  const pageB1 = await userBContext.newPage();
  const pageC1 = await userCContext.newPage();
  
  // 4. Navigate to different sites in different contexts
  await pageA1.goto('https://example.com');
  await pageA2.goto('https://playwright.dev');
  await pageB1.goto('https://example.com'); // Same site, different context (different user agent, viewport)
  await pageC1.goto('https://maps.google.com'); // Different browser with geolocation enabled
  
  // PAGE LEVEL OPERATIONS
  
  // 5. Interact with pages
  await pageA1.fill('input[name="search"]', 'Playwright');
  await pageA1.click('button[type="submit"]');
  await pageA1.waitForSelector('.results');
  
  // 6. Switch to a different page in the same context
  console.log('Switching to pageA2 in userAContext...');
  await pageA2.bringToFront(); // Make this page active
  const title = await pageA2.title();
  console.log(`Page title: ${title}`);
  
  // 7. Switch to a different context (different user) and verify isolation
  console.log('Switching to userB context...');
  // Check if the context has different settings
  const userAgent = await pageB1.evaluate(() => navigator.userAgent);
  console.log(`User agent in context B: ${userAgent}`);
  
  // 8. Demonstrate context isolation (cookies not shared)
  await pageA1.goto('https://example.com');
  await pageA1.evaluate(() => {
    document.cookie = 'user=Alice; path=/';
  });
  
  // This page is in a different context so it won't have the cookie
  const cookieB = await pageB1.evaluate(() => document.cookie);
  console.log(`Cookies in context B: "${cookieB}"`); // Should be empty
  
  // 9. Create a new page in an existing context
  console.log('Creating a new page in userC context...');
  const pageC2 = await userCContext.newPage();
  await pageC2.goto('https://example.com/about');
  
  // 10. Switch between browsers
  console.log('Switching to Firefox browser...');
  // We're now working with the Firefox browser instead of Chromium
  const geolocation = await pageC1.evaluate(() => {
    return new Promise(resolve => {
      navigator.geolocation.getCurrentPosition(
        position => resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }),
        error => resolve({ error: error.message })
      );
    });
  });
  console.log('Geolocation in Firefox:', geolocation);
  
  // 11. Close specific pages
  console.log('Closing specific pages...');
  await pageA2.close();
  await pageC2.close();
  
  // 12. Close contexts
  console.log('Closing contexts...');
  await userAContext.close();
  await userBContext.close();
  await userCContext.close();
  
  // 13. Close browsers
  console.log('Closing browsers...');
  await chromium.close();
  await firefox.close();
});

// Example of reusing contexts for authentication
test('Reusing authenticated context', async ({ browser }) => {
  // Create a context for logged-in user
  const loggedInContext = await browser.newContext();
  const loginPage = await loggedInContext.newPage();
  
  // Perform login
  await loginPage.goto('https://example.com/login');
  await loginPage.fill('input[name="username"]', 'user@example.com');
  await loginPage.fill('input[name="password"]', 'password123');
  await loginPage.click('button[type="submit"]');
  await loginPage.waitForNavigation();
  
  // Verify we're logged in
  const isLoggedIn = await loginPage.isVisible('.user-profile');
  expect(isLoggedIn).toBeTruthy();
  
  // Now use the same authenticated context for different pages
  const profilePage = await loggedInContext.newPage();
  await profilePage.goto('https://example.com/profile');
  // This page should already be authenticated because it shares the context
  
  const dashboardPage = await loggedInContext.newPage();
  await dashboardPage.goto('https://example.com/dashboard');
  // This page should also be authenticated
  
  // Close pages but keep context alive
  await loginPage.close();
  await profilePage.close();
  
  // Navigate to a restricted page with the dashboard page
  await dashboardPage.goto('https://example.com/settings');
  // Still authenticated
  
  await loggedInContext.close();
});