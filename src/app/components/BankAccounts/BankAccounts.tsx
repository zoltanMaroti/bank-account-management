"use client";

import React from "react";
import BankAccountCard from "@/app/components/BankAccountCard/BankAccountCard";
import { BankAccount } from "@/app/components/BankAccountCard/types";
import HorizontalScroll from "@/app/components/HorizontalScroll/HorizontalScroll";

const BankAccounts = ({
    initialAccounts,
}: {
    initialAccounts: BankAccount[];
}) => {
    return (
        <section className='flex flex-col gap-4 m-2 min-h-64'>
            <div className='flex gap-2 w-full'>
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
