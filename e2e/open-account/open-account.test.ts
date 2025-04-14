import { test, expect } from "@playwright/test";
import { screenshotConfig, snapshotSuffix, viewport } from "../config";

test.describe("Open account page visual regression tests", () => {
    test.beforeEach(async ({ page }, snapshot) => {
        snapshot.snapshotSuffix = snapshotSuffix;
        await page.goto("/account/open");
        await page.setViewportSize(viewport);
    });

    test("Account description is rendered in preview", async ({ page }) => {
        const description = page.getByTestId("account-description");
        await description.fill("This is a test description");
        const screenshot = await page.screenshot(screenshotConfig);
        expect(screenshot).toMatchSnapshot("account-description.jpeg");
    });

    test("Form validation errors are rendered", async ({ page }) => {
        const button = page.getByTestId("submit-account");
        await button.click();
        const screenshot = await page.screenshot(screenshotConfig);
        expect(screenshot).toMatchSnapshot("validation-errors.jpeg");
    });
});
