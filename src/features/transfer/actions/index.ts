"use server";

import { TransferFundsFormValues } from "@/features/transfer/types";
import { redirect } from "next/navigation";
import { fetchCreateTransaction } from "@/features/transfer/services";
import { fetchUpdateBankAccount } from "@/features/bank-accounts/services";
import { getCurrencyMultiplier } from "@/features/transfer/utils";
import { revalidatePath } from "next/cache";
import { CurrencyRates } from "@/features/currencies/types";

export const createTransaction = async (
    data: TransferFundsFormValues,
    currencyRates: CurrencyRates
) => {
    const { sourceAccount, targetAccount, targetAmount, targetCurrency } = data;

    // Calculate target amount in source currency
    const sourceAccountMultiplier = getCurrencyMultiplier(
        currencyRates,
        targetCurrency,
        sourceAccount.currency
    );
    const targetAmountInSourceCurrency = targetAmount * sourceAccountMultiplier;

    // Calculate target amount in target currency
    const targetAccountMultiplier = getCurrencyMultiplier(
        currencyRates,
        targetCurrency,
        targetAccount.currency
    );
    const targetAmountInTargetCurrency = targetAmount * targetAccountMultiplier;

    // Update source account balance
    const sourceAccountBalance =
        +sourceAccount.balance - +targetAmountInSourceCurrency;

    // Update target account balance
    const targetAccountBalance =
        +targetAccount.balance + +targetAmountInTargetCurrency;

    const timestamp = Math.floor(Date.now() / 1000);

    /**
     * Updating bank account balance should only happen on api level.
     * It's only implemented here to demonstrate the integration with mocked BE.
     */
    await Promise.all([
        fetchCreateTransaction({
            targetAmount,
            targetCurrency,
            targetAccount,
            sourceAccount,
            timestamp,
        }),
        fetchUpdateBankAccount(
            { balance: sourceAccountBalance },
            sourceAccount.id
        ),
        fetchUpdateBankAccount(
            { balance: targetAccountBalance },
            targetAccount.id
        ),
    ]);
    revalidatePath("/");
    redirect("/");
};
