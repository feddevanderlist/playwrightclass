import {test, expect} from '@playwright/test';
import {faker} from '@faker-js/faker';
import {HomePage} from "./pages/Home.page";
import {ContactPage} from "./pages/contact.page";


test('has title', async ({page}) => {
    await page.goto('');
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle("Practice Software Testing - Toolshop - v5.0");
});

test("verify contact message", async ({page}) => {
    const homepage = new HomePage(page);
    await homepage.goto();
    await homepage.clickOnContact();
    // await page.getByTestId('nav-contact').click();
    await page.getByTestId('first-name').fill(faker.person.firstName());
    await page.getByTestId('last-name').fill('lastname');
    await page.getByTestId('email').fill(faker.internet.email());
    await page.getByTestId('subject').selectOption('return');
    await page.getByTestId('message').fill('this is a test message and should be at least 50 chars long');
    await page.getByTestId('contact-submit').click();
    await expect(page.getByRole('alert')).toContainText('Thanks for your message! We will contact you shortly.');
});

test('Navigate to the product detail page', async ({page}) => {
    await page.goto('');
    await page.getByTestId('product-name').first().click();
    await expect(page.getByTestId('product-name')).toContainText('Combination Pliers');
});

test('Navigate to the product category page', async ({page}) => {
    await page.goto('');
    await page.getByTestId('nav-categories').click();
    await page.getByTestId('nav-power-tools').click();
    await expect(page.locator('[class="card"]')).toHaveCount(8);
});

test('Navigate to the product category page (unhappy)', async ({page}) => {
    await page.goto('');
    await page.getByTestId('nav-categories').click();
    await page.getByTestId('nav-special-tools').click();
    await expect(page.getByTestId('page-title')).toContainText('Category: Special Tools');
    await expect(page.getByTestId('category-empty')).toContainText('There are no products available yet.');
});

