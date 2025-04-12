"use server";

import { fetchSearchBankAccount } from "@/app/components/BankAccounts/services";

export const searchAccount = async (searchTerm: string) => {
    return await fetchSearchBankAccount(searchTerm);
};
