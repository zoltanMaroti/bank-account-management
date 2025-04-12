"use client";

import React from "react";
import BankAccountCard from "@/app/components/BankAccountCard/BankAccountCard";
import { BankAccount } from "@/app/components/BankAccountCard/types";
import HorizontalScroll from "@/app/components/HorizontalScroll/HorizontalScroll";
import CreateBankAccountButton from "@/app/components/CreateBankAccountButton/CreateBankAccountButton";
import SearchBankAccount from "@/app/components/SearchBankAccount/SearchBankAccount";
import { useTranslations } from "next-intl";

const BankAccounts = ({
    initialAccounts,
}: {
    initialAccounts: BankAccount[];
}) => {
    const t = useTranslations("DashboardPage");

    return (
        <section className='flex flex-col gap-2 m-2 min-h-64'>
            <div className='flex justify-between flex-col gap-2 md:flex-row md:items-center'>
                <h1 className='flex-1 text-2xl font-bold'>{t("title")}</h1>
                <SearchBankAccount onChange={() => {}} searchTerm={""} />
            </div>
            <div className='flex gap-2 w-full flex-col md:flex-row'>
                <div className='flex-shrink-0'>
                    <CreateBankAccountButton />
                </div>
                <div className='flex-grow overflow-hidden'>
                    <HorizontalScroll>
                        {initialAccounts.map(
                            ({
                                id,
                                ownerId,
                                currency,
                                balance,
                                accountType,
                                description,
                            }) => (
                                <BankAccountCard
                                    key={id}
                                    id={id}
                                    ownerId={ownerId}
                                    currency={currency}
                                    balance={balance}
                                    accountType={accountType}
                                    description={description}
                                />
                            )
                        )}
                    </HorizontalScroll>
                </div>
            </div>
        </section>
    );
};

export default BankAccounts;
