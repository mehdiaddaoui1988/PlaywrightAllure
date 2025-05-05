import { test, expect } from "@playwright/test";
import LoginPage from "../src/page-objects/loginPage/LoginPage";
import userQa from "../src/test-data/qa/userQa";
import { allure } from "allure-playwright";
import { DataFactoryPhysicalMember } from "../src/utils/DataFactoryPhysicalMemberFirst";
import { DataFactory } from "../src/utils/DataFactory";

test("member login", { tag: ["@login", "@favorite"] }, async ({ page }) => {
  await allure.parentSuite("Automation Project");
  await allure.suite("OrangeHrm");
  await allure.subSuite("Authentification");
  const loginPage = new LoginPage(page);

  await page.goto("/");

  await test.step("fill the user", async () => {
    await allure.attachment("User data",JSON.stringify("TEST-TEST", null, 2),"application/json");
    //await loginPage.fillUsername();
    //await loginPage.fillField('username', userQa.user_auth.login)
    await loginPage.fillField("username", userQa.user_auth.login);
    //await page.pause();
    await allure.attachment("User data", JSON.stringify(userQa.user_auth.login, null, 2),"application/json" );

    await allure.attachment("User Data First Name", JSON.stringify(DataFactoryPhysicalMember.getFirstName("Male"), null, 2),
      "application/json"
    );
    await allure.attachment(
      "First name random",
      JSON.stringify(DataFactory.getFirstName1(), null, 2),
      "application/json"
    );

   //await page.pause();
  });
  await test.step("fill the password", async () => {
    await loginPage.fillPassword();
    await allure.attachment("User Data",JSON.stringify(userQa.user_auth.password, null, 2),"application/json");
  });
  await test.step("click validate button", async () => {
    //await page.pause();
    await loginPage.clickLoginButton();
  });

  await test.step("expect th e title in the dashboard", async () => {
    await expect(page).toHaveTitle(/OrangeHRM/);
  }); 
  //await page.pause();
});

test("The member logining ",{ tag: ["@logining", "@favorite"] },async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto("/");
    await loginPage.loginToApplication();
    await expect(page).toHaveTitle(/OrangeHRM/);
  }
);
