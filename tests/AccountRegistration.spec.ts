/**
 * Test Case: Account Registration
 * 
 * Tags: @master @sanity @regression
 * 
 * Steps:
 * 1) Navigate to application URL 
 * 2) Go to 'My Account' and click 'Register'
 * 3) Fill in registration details with random data
 * 4) Agree to Privacy Policy and submit the form
 * 5) Validate the confirmation message
 */

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { RandomDataUtil } from '../utils/randomDataGenerator';
import { TestConfig } from '../test.config';

let homePage: HomePage;
let registrationPage: RegistrationPage;
let config: TestConfig;

test.beforeEach(async ({ page }) => {
    // Create an instance of TestConfig to access configuration values
    config = new TestConfig();
    await page.goto(config.appUrl); // Navigate to the application URL  
    homePage = new HomePage(page);
    registrationPage = new RegistrationPage(page);
})

test.afterEach(async ({ page }) => {
    // Close the page after each test
    await page.waitForTimeout(2000); // Wait for 2 seconds before closing the page
    await page.close();
})

test ('User Registration Test @master @sanity @regression', async () => {

     //go to home page and click on my account and register
    await homePage.clickMyAccount();
    await homePage.clickRegister();

    // RegistrationPage and fill in the registration form with random data
    await registrationPage.setFirstName(RandomDataUtil.getFirstName());
    await registrationPage.setLastName(RandomDataUtil.getlastName());
    await registrationPage.setEmail(RandomDataUtil.getEmail());
    await registrationPage.setTelephone(RandomDataUtil.getPhoneNumber());

    // Generate a random password and set it in the form
    const password = RandomDataUtil.getPassword();
    await registrationPage.setPassword(password);
    await registrationPage.setConfirmPassword(password);
    await registrationPage.setPrivacyPolicy();
    await registrationPage.clickContinue();

    // Validate the confirmation message after successful registration
    const confirmationMsg = await registrationPage.getConfirmationMsg();
    expect(confirmationMsg).toBe(config.regcompleteMsg);  

})