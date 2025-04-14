import { Currency, CurrencyRates } from "@/features/currencies/types";
import { MINIMUM_TRANSFER_AMOUNT } from "../constants";
import { formatCurrency } from "../../bank-accounts/utils";

export const getCurrencyMultiplier = (
    currencyRates: CurrencyRates,
    sourceCurrency: Currency | undefined,
    selectedCurrency: Currency
) => {
    if (!sourceCurrency) {
        return 1;
    }

    return currencyRates[sourceCurrency][selectedCurrency];
};

export const convertBalanceToCurrency = (
    sourceBalance: number | undefined,
    currencyMultiplier: number
) => {
    if (!sourceBalance) {
        return 0;
    }

    return sourceBalance * currencyMultiplier;
};

export const hasSufficientFunds = (
    currencyConvertedSourceBalance: number,
    selectedCurrency: Currency
) => {
    return (value: number) => {
        if (currencyConvertedSourceBalance >= value) {
            return true;
        }
        return `You do not have enough funds to transfer ${formatCurrency(
            selectedCurrency,
            value
        )}`;
    };
};

export const validateTargetAmount = (
    targetCurrency: Currency,
    currencyConvertedBalance: number
) => ({
    required: {
        value: true,
        message: "This field is required",
    },
    min: {
        value: MINIMUM_TRANSFER_AMOUNT,
        message: `The minimum transfer amount is ${formatCurrency(
            targetCurrency,
            MINIMUM_TRANSFER_AMOUNT
        )}`,
    },
    validate: hasSufficientFunds(currencyConvertedBalance, targetCurrency),
});
