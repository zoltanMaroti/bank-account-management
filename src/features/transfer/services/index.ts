import { CurrencyRates } from "@/features/currencies/types";
import { Transaction } from "@/features/transfer/types";

export const fetchCurrencyRates = async (): Promise<CurrencyRates> => {
    const response = await fetch(`${process.env.API_URL}/currencyConversion`);

    if (!response.ok) {
        // Handle error, log to Sentry etc.
        console.error("Failed to fetch currency conversion");
    }

    return response.json();
};

export const fetchCreateTransaction = (data: Transaction) => {
    return fetch(`${process.env.API_URL}/transactions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .catch(() => {
            // Handle error, log to Sentry etc.
            console.error("Failed to create transaction");
        });
};
