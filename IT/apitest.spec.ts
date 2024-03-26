import {expect, test} from '@playwright/test';
import {allure} from "allure-playwright";

test('should retrieve all brands', async ({request}) => {
    await allure.label("type", "api");
    await allure.story("ophalen van brands");
    const response = await request.get(`https://api.practicesoftwaretesting.com/brands`);
    expect(response.ok()).toBeTruthy();
    const body = await response.body().then(b => {
        return JSON.parse(b.toString());
    })
    const names: string[] = body.map(item => item.name);
    expect(names.length).toBe(2);
    expect(names).toContain('ForgeFlex Tools');
    expect(names).toContain('MightyCraft Hardware');
});

test('should authenticate', async ({request}) => {
    await allure.label("type", "api");
    await allure.story("inloggen");
    const tokenResponse = await request.post(`https://api.practicesoftwaretesting.com/users/login`, {
        data: {
            email: 'customer@practicesoftwaretesting.com',
            password: 'welcome01',
        }
    });
    expect(tokenResponse.ok()).toBeTruthy();
});

test('should authenticate and get invoices', async ({request}) => {
    await allure.label("type", "api");
    await allure.story("get invoices");
    const response = await request.post(`https://api.practicesoftwaretesting.com/users/login`, {
        data: {
            email: 'customer@practicesoftwaretesting.com',
            password: 'welcome01',
        }
    });
    expect(response.ok()).toBeTruthy();
    const tokenResponse = await response.json();
    const invoices = await request.get(`https://api.practicesoftwaretesting.com/invoices`, {
        headers: {Authorization: `Bearer ${tokenResponse.access_token}`},
    });
    expect(invoices.ok()).toBeTruthy();
});
