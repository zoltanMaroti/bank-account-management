import { BankAccount } from "@/features/bank-accounts/types";
import { Currency } from "@/features/currencies/types";

export type TransferFundsFormValues = {
    sourceAccount: BankAccount;
    targetAccount: BankAccount;
    targetAmount: number;
    targetCurrency: Currency;
};

export type Transaction = {
    id?: string;
    sourceAccount: BankAccount;
    targetAccount: BankAccount;
    targetAmount: number;
    targetCurrency: Currency;
    timestamp: number;
};
