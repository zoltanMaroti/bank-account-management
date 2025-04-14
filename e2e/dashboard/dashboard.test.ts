import { test, expect } from "@playwright/test";
import { screenshotConfig, snapshotSuffix, viewport } from "../config";

test.describe("Dashboard page visual regression tests", () => {
    test.beforeEach(async ({ page }, snapshot) => {
        snapshot.snapshotSuffix = snapshotSuffix;
        await page.goto("/");
        await page.setViewportSize(viewport);
    });

    test("Dashboard is rendered", async ({ page }) => {
        const screenshot = await page.screenshot(screenshotConfig);
        expect(screenshot).toMatchSnapshot("dashboard.jpeg");
    });

    test("Search result is displayed", async ({ page }) => {
        const search = page.getByTestId("search");
        await search.click();
        await search.fill("My savings");
        await page.waitForTimeout(1000); // TODO: fix flaky test by waiting for server-action to be completed
        const screenshot = await page.screenshot(screenshotConfig);
        expect(screenshot).toMatchSnapshot("search-result.jpeg");
    });

    test("No result message is displayed", async ({ page }) => {
        const search = page.getByTestId("search");
        await search.click();
        await search.fill("this account should not exist");
        await page.waitForLoadState("networkidle");
        const screenshot = await page.screenshot(screenshotConfig);
        expect(screenshot).toMatchSnapshot("no-result-message.jpeg");
    });

    test("Edit button is displayed on hover", async ({ page }) => {
        const card = page.getByTestId("account-card").first();
        await card.hover();
        const screenshot = await page.screenshot(screenshotConfig);
        expect(screenshot).toMatchSnapshot("card-hover.jpeg");
    });
});
