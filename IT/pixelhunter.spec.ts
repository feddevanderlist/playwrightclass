import {expect, test} from "@playwright/test";
import {HomePage} from "./pages/Home.page";
import {allure} from "allure-playwright";

test('has title', async ({page}) => {
    await allure.label("type", "pixelhunter");
    await allure.story("verifieren van design");
    const homepage = new HomePage(page);
    await homepage.goto();
    await homepage.verifyScreenShot();
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle("Practice Software Testing - Toolshop - v5.0");
});
