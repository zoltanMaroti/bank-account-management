import { BankAccount } from "@/features/bank-accounts/types";
import { BankAccountFormValues } from "@/features/bank-accounts/types";

export const fetchCreateBankAccount = (data: BankAccount) => {
    return fetch(`${process.env.API_URL}/accounts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .catch((error) => {
            // Handle error, log to Sentry etc.
            console.error("Failed to create bank account");
        });
};

export const fetchUpdateBankAccount = async (
    data:
        | BankAccountFormValues
        | (Partial<BankAccountFormValues> & { balance?: number }),
    id: string
): Promise<BankAccount> => {
    return fetch(`${process.env.API_URL}/accounts/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .catch((error) => {
            // Handle error, log to Sentry etc.
            console.error("Failed to update bank account");
        });
};

export const fetchBankAccounts = async (): Promise<BankAccount[]> => {
    const response = await fetch(`${process.env.API_URL}/accounts`);

    if (!response.ok) {
        // Handle error, log to Sentry etc.
        console.error("Failed to fetch bank accounts");
    }

    return response.json();
};

export const fetchBankAccount = async (id: string | string[]) => {
    const response = await fetch(`${process.env.API_URL}/accounts/${id}`);

    if (!response.ok) {
        // Handle error, log to Sentry etc.
        console.error("Failed to fetch bank account", id);
        return;
    }

    return response.json();
};

export const fetchSearchBankAccount = async (searchTerm: string) => {
    const response = await fetch(
        `${process.env.API_URL}/accounts?q=${searchTerm}`
    );

    if (!response.ok) {
        // Handle error, log to Sentry etc.
        console.error("Failed to search bank account", searchTerm);
    }

    return response.json();
};

export const fetchDeleteBankAccount = async (
    id: string
): Promise<BankAccount> => {
    return fetch(`${process.env.API_URL}/accounts/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .catch((error) => {
            // Handle error, log to Sentry etc.
            console.error("Failed to delete bank account");
        });
};
