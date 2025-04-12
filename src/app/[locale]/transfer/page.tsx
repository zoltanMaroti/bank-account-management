import React from "react";
import TransferFundsForm from "@/features/transfer/components/TransferFundsForm";
import { fetchBankAccounts } from "@/features/bank-accounts/services";
import { fetchCurrencyConversion } from "@/features/transfer/services";
import NoBankAccountMessage from "@/features/bank-accounts/components/NoBankAccountMessage";

export default async function TransferPage() {
    const [accounts, currencyConversion] = await Promise.all([
        fetchBankAccounts(),
        fetchCurrencyConversion(),
    ]);

    if (!accounts || !accounts.length) {
        return <NoBankAccountMessage />;
    }

    return (
        <section className='m-2 flex flex-col items-center'>
            <div className='w-96'>
                <TransferFundsForm
                    accounts={accounts}
                    currencyConversion={currencyConversion}
                />
            </div>
        </section>
    );
}
