"use server";

import { redirect } from "next/navigation";
import {
    fetchCreateBankAccount,
    fetchUpdateBankAccount,
} from "@/features/bank-accounts/services";
import { BankAccountFormValues } from "@/features/bank-accounts/types";
import { Currency } from "@/features/currencies/types";
import { AccountType } from "@/features/bank-accounts/types";
import { generateBankAccountId } from "@/features/bank-accounts/utils";
import { revalidatePath } from "next/cache";
import { fetchSearchBankAccount } from "@/features/bank-accounts/services";
import { BankAccount } from "@/features/bank-accounts/types";
import { fetchDeleteBankAccount } from "@/features/bank-accounts/services";
import { hasBalance } from "@/features/bank-accounts/utils";

export const createBankAccount = async (data: BankAccountFormValues) => {
    const { currency, accountType, description } = data;
    /**
     * Normally id and balance should be generated on api level.
     * Only generating it on the client because of the mocked backend.
     */
    const id = generateBankAccountId();

    await fetchCreateBankAccount({
        id,
        ownerId: 1,
        balance: 0,
        currency: currency as Currency,
        accountType: accountType as AccountType,
        description,
    });

    revalidatePath("/");
    redirect("/");
};

export const updateBankAccount = async (
    data: BankAccountFormValues,
    id?: string
) => {
    if (!id) {
        throw new Error("Missing bank account id");
    }

    await fetchUpdateBankAccount(data, id);

    revalidatePath("/");
    revalidatePath(`/account/${id}`);
    redirect("/");
};

export const searchAccount = async (searchTerm: string) => {
    return await fetchSearchBankAccount(searchTerm);
};

export const deleteBankAccount = async (account: BankAccount) => {
    if (!account.id) {
        return;
    }
    const { id, balance } = account;
    // Protection against deleting account with balance
    if (hasBalance(balance)) {
        throw new Error("Can't delete account with balance");
    }

    await fetchDeleteBankAccount(id!);

    revalidatePath("/");
    redirect("/");
};
