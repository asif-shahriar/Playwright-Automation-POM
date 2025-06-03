import { test } from '../../global_setup/test_setup.js';
import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import fs from 'fs';
import { signUpLocators } from '../../locators/signUpLocators.js';
import { loginLocators } from '../../locators/loginLocators.js';


test.beforeEach(async ({ page }) => {
    try {
        // Load saved url from baseurl.json 
        const { url } = JSON.parse(fs.readFileSync('data/baseurl.json', 'utf-8'));

        await page.goto(url, { waitUntil: 'load' }); // waits for full page load
        await page.waitForSelector(signUpLocators.pageLogo) // waiting for to load the page logo
        await expect(page).toHaveTitle('STORE')
        console.log('Page loaded and title verified')
    } catch (error) {
        console.error('Failed to load the page or match title:', error)
        throw error;
    }
});


test('Sign up and login with that user [no-setup]', async ({ page }) => {
    await page.click(signUpLocators.signUpButton)

    const modalText = await page.textContent(signUpLocators.signUpModalTitle)
    expect(modalText).toBe('Sign up')

    const username = faker.internet.username()
    const password = faker.internet.password()

    await page.fill(signUpLocators.username, username)
    await page.fill(signUpLocators.password, password)

    // Set up dialog/alert handler BEFORE the click
    const alertPromise = new Promise(resolve => {
        page.once('dialog', async dialog => {
            const dialogText = dialog.message();
            expect(dialogText).toBe('Sign up successful.');
            await dialog.accept();

            // loading the fake username and password on userinfo.json file
            fs.writeFileSync('data/signupinfo.json', JSON.stringify({ username, password }, null, 2));
            console.log('Credentials saved to userinfo.json');

            resolve(); // Notify that dialog is handled
        });
    });

    await page.waitForSelector(signUpLocators.submitRegisterBtn)
    await page.click(signUpLocators.submitRegisterBtn)

    await alertPromise;
    console.log(`Signup successful with username: '${username}' and password: '${password}'`)


    // Load saved username and password from userinfo.json 
    const { username: userid, password: pw } = JSON.parse(fs.readFileSync('data/signupinfo.json', 'utf-8'));

    console.log(`extracted username: '${userid}' and password: '${pw}'`)

    await page.click(loginLocators.btnLogin);
    await expect(page.locator(loginLocators.loginModalTitle)).toBeVisible();

    await page.fill(loginLocators.username, userid);
    await page.fill(loginLocators.password, pw);

    await page.click(loginLocators.btnSubmitLogin);

    // Assert that login was successful
    await expect(page.locator(loginLocators.nameOfLoggedInUser)).toContainText(`Welcome ${userid}`)
    console.log(`Login successful with username: '${userid}' and password: '${pw}'`)
})