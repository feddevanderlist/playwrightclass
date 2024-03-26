import {expect, test} from '@playwright/test';
import accounts from './data/account.data';
import {AccountPage} from "./pages/account.page";
import {allure} from "allure-playwright";
import {LoginPage} from "./pages/login.page";


accounts.forEach((account) => {
    test(`testing login with ${account.email}`, async ({page}) => {
        // Test implementation
        await allure.label("type", "inloggen");
        await allure.issue("Issue Name", "/issues/352");
        await allure.story("inloggen van gebruikers");
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.insertEmail(account.email);
        await loginPage.insertPassword('welcome01');
        await loginPage.clickLogin();
        const accountPage = new AccountPage(page);
        expect(await accountPage.getTitle()).toStrictEqual(account.result);
    });
});

