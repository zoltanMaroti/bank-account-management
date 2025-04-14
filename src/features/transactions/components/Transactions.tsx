import React from "react";
import { Transaction } from "@/features/transfer/types";
import { useTranslations } from "next-intl";
import TransactionCard from "@/features/transactions/components/TransactionCard";

type Props = {
    transactions: Transaction[];
};

const Transactions = ({ transactions }: Props) => {
    const t = useTranslations("Transactions");

    return (
        <section className='m-2 flex flex-col gap-4'>
            <h1 className='flex-1 text-2xl font-bold'>{t("title")}</h1>
            <ul className='flex flex-col gap-2'>
                {transactions.map((transaction) => (
                    <TransactionCard
                        key={transaction.id}
                        transaction={transaction}
                    />
                ))}
            </ul>
        </section>
    );
};

export default Transactions;
