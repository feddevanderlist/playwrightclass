import {Locator, Page} from '@playwright/test';

export class LoginPage {
    readonly url = "https://practicesoftwaretesting.com/#/auth/login";
    readonly email: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly page: Page;


    constructor(page: Page) {
        this.page = page;
        this.email = page.getByTestId('email');
        this.password = page.getByTestId('password');
        this.loginButton = page.getByTestId('login-submit');
    }

    async goto() {
        await this.page.goto(this.url);
    }

    async insertEmail(email: string) {
        await this.email.waitFor({state: "visible"});
        await this.email.fill(email);
    }

    async insertPassword(password: string) {
        await this.password.waitFor({state: "visible"});
        await this.password.fill(password);
    }

    async clickLogin() {
        await this.loginButton.waitFor({state: "visible"});
        await this.loginButton.click();
    }

    async executeLogin(email: string, password: string) {
        await this.insertEmail(email);
        await this.insertPassword(password);
        await this.clickLogin();
    }
}
