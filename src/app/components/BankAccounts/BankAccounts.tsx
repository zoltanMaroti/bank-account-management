"use client";

import React from "react";
import { BankAccount } from "@/app/components/BankAccountCard/types";
import { useSearch } from "@/app/components/BankAccounts/hooks";
import NoResults from "@/app/components/NoResult/NoResult";
import BankAccountsLayout from "@/app/components/BankAccounts/BankAccountsLayout";
import BankAccountsCarousel from "@/app/components/BankAccountsCarousel/BankAccountsCarousel";

type Props = {
    bankAccounts: BankAccount[];
};

const BankAccounts = ({ bankAccounts }: Props) => {
    const { searchResult, debouncedSearchTerm, onChangeSearchTerm, isPending } =
        useSearch();

    if (isPending) {
        return (
            <BankAccountsLayout
                onChange={onChangeSearchTerm}
                searchTerm={debouncedSearchTerm}
            >
                <div className='flex gap-2 w-full'>Loading...</div>
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
