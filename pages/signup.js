import { expect } from '@playwright/test';
import { signUpLocators } from '../locators/signUpLocators.js'
import { writeJson } from '../utilities/jsonActions.js'
import { faker } from '@faker-js/faker';

export class SignUp {

    /**
     * Reference "Page" from Playwright without actually importing it in the code
     * Helps with auto-suggestion/auto-completion
     * Add this JSDoc before class constructor and you're good to go
     * @param {import('@playwright/test').Page} page
    */
    constructor(page) {
        this.page = page;
    }

    async signUpWithFakeUserData(filePath) {
        await this.page.click(signUpLocators.signUpButton)

        const modalText = await this.page.textContent(signUpLocators.signUpModalTitle)
        expect(modalText).toBe('Sign up')

        const username = faker.internet.username()
        const pass = faker.internet.password()

        await this.page.fill(signUpLocators.username, username)
        await this.page.fill(signUpLocators.password, pass)

        // Set up dialog/alert handler BEFORE the click
        const alertPromise = new Promise(resolve => {
            this.page.once('dialog', async dialog => {
                const dialogText = dialog.message();
                expect(dialogText).toBe('Sign up successful.');
                await dialog.accept();

                /* 
                loading the fake username and password on userinfo.json file. 
                if the key matches the variable, you don't need to pass it along with the key.
                Here, variable name "pass" is not same as key, so you have to pass it along with the key.
                The format is key:value/variable
                */
                writeJson(filePath, { username, password: pass })

                resolve('Sign up alert is closed'); // Notify that dialog is handled
            });
        });

        await this.page.waitForSelector(signUpLocators.submitRegisterBtn)
        await this.page.click(signUpLocators.submitRegisterBtn)

        await alertPromise;
        console.log(`Signup successful with username: '${username}'`)

    }

    async signUp(username, password) {
        await this.page.click(signUpLocators.signUpButton)

        const modalText = await this.page.textContent(signUpLocators.signUpModalTitle)
        expect(modalText).toBe('Sign up')

        await this.page.fill(signUpLocators.username, username)
        await this.page.fill(signUpLocators.password, password)

        // Set up dialog/alert handler BEFORE the click
        const alertPromise = new Promise(resolve => {
            this.page.once('dialog', async dialog => {
                const dialogText = dialog.message();
                expect(dialogText).toBe('Sign up successful.');
                await dialog.accept();
                resolve(); // Notify that dialog is handled
            });
        });

        await this.page.waitForSelector(signUpLocators.submitRegisterBtn)
        await this.page.click(signUpLocators.submitRegisterBtn)

        await alertPromise;
        console.log(`Signup successful with username: '${username}'`)

    }
}