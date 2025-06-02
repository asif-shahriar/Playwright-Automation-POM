import { test } from '../global_setup/test_setup.js';
import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import fs from 'fs';


test.beforeEach(async ({ page }) => {
    try {
        await page.goto('https://demoblaze.com', { waitUntil: 'load' }); // waits for full page load
        await page.waitForSelector('#nava') // waiting for to load the page logo
        await expect(page).toHaveTitle('STORE')
        console.log('Page loaded and title verified')
    } catch (error) {
        console.error('Failed to load the page or match title:', error)
        throw error;
    }
});


test('Sign up and login with that user [no-setup]', async ({ page }) => {
    await page.click('#signin2')

    const modalText = await page.textContent('id=signInModalLabel')
    expect(modalText).toBe('Sign up')

    const username = faker.internet.username()
    const password = faker.internet.password()

    await page.fill('#sign-username', username)
    await page.fill('#sign-password', password)

    // Set up dialog/alert handler BEFORE the click
    const alertPromise = new Promise(resolve => {
        page.once('dialog', async dialog => {
            const dialogText = dialog.message();
            expect(dialogText).toBe('Sign up successful.');
            await dialog.accept();

            // loading the fake username and password on userinfo.json file
            fs.writeFileSync('Data/signupinfo.json', JSON.stringify({ username, password }, null, 2));
            console.log('Credentials saved to userinfo.json');

            resolve(); // Notify that dialog is handled
        });
    });

    await page.waitForSelector('button[onclick="register()"]')
    await page.click('button[onclick="register()"]')

    await alertPromise;
    console.log(`Signup successful with username: '${username}' and password: '${password}'`)


    // Load saved username and password from userinfo.json 
    const { username: userid, password: pw } = JSON.parse(fs.readFileSync('Data/signupinfo.json', 'utf-8'));

    console.log(`extracted username: '${userid}' and password: '${pw}'`)

    await page.click('#login2');
    await expect(page.locator('#logInModal')).toBeVisible();

    await page.fill('#loginusername', userid);
    await page.fill('#loginpassword', pw);

    await page.click("button[onclick='logIn()']");

    // Assert that login was successful
    await expect(page.locator('#nameofuser')).toContainText(`Welcome ${userid}`)
    console.log(`Login successful with username: '${userid}' and password: '${pw}'`)
})