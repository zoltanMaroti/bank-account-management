"use client";

import React from "react";
import { BankAccount } from "@/features/bank-accounts/types";
import { useSearch } from "@/features/bank-accounts/hooks";
import NoResults from "@/features/bank-accounts/components/NoResult";
import BankAccountsLayout from "@/features/bank-accounts/components/BankAccountsLayout";
import BankAccountsCarousel from "@/features/bank-accounts/components/BankAccountsCarousel";
import { useTranslations } from "next-intl";

type Props = {
    bankAccounts: BankAccount[];
};

const BankAccounts = ({ bankAccounts }: Props) => {
    const { searchResult, debouncedSearchTerm, onChangeSearchTerm, isPending } =
        useSearch();

    const t = useTranslations("SearchBankAccount");

    if (isPending) {
        return (
            <BankAccountsLayout
                onChange={onChangeSearchTerm}
                searchTerm={debouncedSearchTerm}
            >
                <div className='flex gap-2 w-full h-100 max-h-32 items-center justify-center'>
                    {t("pending")}
                </div>
            </BankAccountsLayout>
        );
    }

    if (searchResult.length) {
        return (
            <BankAccountsLayout
                onChange={onChangeSearchTerm}
                searchTerm={debouncedSearchTerm}
            >
                <BankAccountsCarousel bankAccounts={searchResult} />
            </BankAccountsLayout>
        );
    }

    if (!searchResult.length && debouncedSearchTerm) {
        return (
            <BankAccountsLayout
                onChange={onChangeSearchTerm}
                searchTerm={debouncedSearchTerm}
            >
                <NoResults searchTerm={debouncedSearchTerm} />
            </BankAccountsLayout>
        );
    }

    return (
        <BankAccountsLayout
            onChange={onChangeSearchTerm}
            searchTerm={debouncedSearchTerm}
        >
            <BankAccountsCarousel bankAccounts={bankAccounts} />
        </BankAccountsLayout>
    );
};

export default BankAccounts;
