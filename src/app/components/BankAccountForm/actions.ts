"use server";

import { redirect } from "next/navigation";
import {
    fetchCreateBankAccount,
    fetchUpdateBankAccount,
} from "@/app/components/BankAccountForm/services";
import { BankAccountFormValues } from "@/app/components/BankAccountForm/types";
import { AccountType, Currency } from "@/app/components/BankAccountCard/types";
import { generateBankAccountId } from "@/app/components/BankAccountCard/utils";
import { revalidatePath } from "next/cache";

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
