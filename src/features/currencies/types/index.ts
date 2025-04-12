export type Currency = "EUR" | "USD" | "GBP";

export type CurrencyOption = { value: Currency; label: Currency };

export type CurrencyConversion = {
    [key in Currency]: {
        [key in Currency]: number;
    };
};
