import {Locator, Page} from '@playwright/test';

export class ContactPage {
    readonly page: Page;
    readonly message: Locator;

    constructor(page: Page) {
        this.page = page;
        this.message = page.getByTestId('message');
    }

    async getMessage(): Promise<string> {
        await this.message.waitFor({state: "visible"});
        return await this.message.textContent();
    }
}
