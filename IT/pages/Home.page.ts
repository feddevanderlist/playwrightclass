import {expect, Locator, Page} from '@playwright/test';

export class HomePage {
    readonly url = "https://practicesoftwaretesting.com";
    readonly page: Page;
    readonly logo: Locator;
    readonly contactMenu: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logo = page.locator('#logo');
        this.contactMenu = page.getByTestId('nav-contact');
    }

    async goto() {
        await this.page.goto(this.url);
    }

    async clickOnContact() {
        await this.contactMenu.waitFor({state: "visible"});
        await this.contactMenu.click();
    }

    async verifyScreenShot() {
        await expect(this.page)
            .toHaveScreenshot('home.png', {
                maxDiffPixels: 100,
                fullPage: true,
                mask: [this.page.locator('.card'),
                    this.page.getByRole('navigation')]
            });
    }
}
