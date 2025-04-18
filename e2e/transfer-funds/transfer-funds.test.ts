import { test, expect } from "@playwright/test";
import { screenshotConfig, snapshotSuffix, viewport } from "../config";
import { getAccountSelector } from "./utils";

test.describe("Dashboard page visual regression tests", () => {
    test.beforeEach(async ({ page }, snapshot) => {
        snapshot.snapshotSuffix = snapshotSuffix;
        await page.goto("/transfer");
        await page.setViewportSize(viewport);
    });

    test("Error message is displayed when account is not selected", async ({
        page,
    }) => {
        const button = page.getByTestId("submit-button");
        await button.click();
        await page.waitForTimeout(300);

        const screenshot = await page.screenshot(screenshotConfig);
        expect(screenshot).toMatchSnapshot("account-error-message.jpeg");
    });

    test("Account selector is open", async ({ page }) => {
        // Select source account
        const sourceAccountSelector = await getAccountSelector(
            page,
            "sourceAccount"
        );
        await sourceAccountSelector?.click();
        const screenshot = await page.screenshot(screenshotConfig);
        expect(screenshot).toMatchSnapshot("account-selector.jpeg");
    });

    test("Error message is displayed when amount is not entered", async ({
        page,
    }) => {
        // Select source account
        const sourceAccountSelector = await getAccountSelector(
            page,
            "sourceAccount"
        );
        await sourceAccountSelector?.click();
        const sourceeAccount = page
            .getByTestId("sourceAccount-selector-item")
            .first();
        await sourceeAccount.click();

        // Select target account
        const targetAccountSelector = await getAccountSelector(
            page,
            "targetAccount"
        );
        await targetAccountSelector?.click();
        const targetAccount = page
            .getByTestId("targetAccount-selector-item")
            .first();
        await targetAccount.click();

        // Submit form
        const submitButton = page.getByTestId("submit-button");
        await submitButton.click();

        const screenshot = await page.screenshot(screenshotConfig);
        expect(screenshot).toMatchSnapshot("amount-error-message.jpeg");
    });

    test("Transfer amount validation", async ({ page }) => {
        // Select source account
        const sourceAccountSelector = await getAccountSelector(
            page,
            "sourceAccount"
        );
        await sourceAccountSelector?.click();
        const sourceeAccount = page
            .getByTestId("sourceAccount-selector-item")
            .first();
        await sourceeAccount.click();

        // Select target account
        const targetAccountSelector = await getAccountSelector(
            page,
            "targetAccount"
        );
        await targetAccountSelector?.click();
        const targetAccount = page
            .getByTestId("targetAccount-selector-item")
            .first();
        await targetAccount.click();

        // Select target amount
        const targetAmount = page.getByTestId("target-amount");
        await targetAmount.fill("10001");

        // Submit form
        const submitButton = page.getByTestId("submit-button");
        await submitButton.click();

        const screenshot = await page.screenshot(screenshotConfig);
        expect(screenshot).toMatchSnapshot("amount-validation.jpeg");
    });

    test("Review transfer is displayed", async ({ page }) => {
        // Select source account
        const sourceAccountSelector = await getAccountSelector(
            page,
            "sourceAccount"
        );
        await sourceAccountSelector?.click();
        const sourceAccount = page
            .getByTestId("sourceAccount-selector-item")
            .nth(1);
        await sourceAccount.click();

        // Select target account
        const targetAccountSelector = await getAccountSelector(
            page,
            "targetAccount"
        );
        await targetAccountSelector?.click();
        const targetAccount = page
            .getByTestId("targetAccount-selector-item")
            .first();
        await targetAccount.click();

        // Select target amount
        const targetAmount = page.getByTestId("target-amount");
        await targetAmount.fill("1000");

        // Submit form
        const submitButton = page.getByTestId("submit-button");
        await submitButton.click();
        await page.waitForTimeout(500);

        const screenshot = await page.screenshot(screenshotConfig);
        expect(screenshot).toMatchSnapshot("review-transfer.jpeg");
    });
});
