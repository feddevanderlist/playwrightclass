import {Locator, Page} from '@playwright/test';

export class AccountPage {
    readonly page: Page;
    readonly title: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.getByTestId('page-title');
    }

    async getTitle(): Promise<string> {
        await this.title.waitFor({state: "visible"});
        return await this.title.textContent();
    }

}
