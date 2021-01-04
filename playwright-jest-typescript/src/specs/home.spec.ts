import {ElementHandle} from "playwright";

it("Home page should have the correct title", async () => {
    await page.goto("https://playwright.dev/");
    expect(await page.title()).toBe("Fast and reliable end-to-end testing for modern web apps");
});

it("Check element text", async () => {
    const elm: ElementHandle | null = await page.$('.navbar__title');
    expect(await elm?.innerText()).toBe('Playwright')
});