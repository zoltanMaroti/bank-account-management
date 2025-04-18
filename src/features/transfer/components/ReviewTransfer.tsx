import React from "react";
import BankAccountCard from "@/features/bank-accounts/components/BankAccountCard";
import TransferIcon from "@/assets/icons/transfer.svg";
import { BankAccount } from "@/features/bank-accounts/types";
import { Currency } from "@/features/currencies/types";
import { formatCurrency } from "@/features/bank-accounts/utils";
import Label from "@/features/ui/components/Label";
import { useTranslations } from "next-intl";

type Props = {
    sourceAccount: BankAccount;
    targetAccount: BankAccount;
    targetAmount: number;
    targetCurrency: Currency;
};

const ReviewTransfer = ({
    sourceAccount,
    targetAccount,
    targetAmount,
    targetCurrency,
}: Props) => {
    const t = useTranslations("TransferFundsPage");

    return (
        <div className='flex flex-col gap-3'>
            <div className='flex gap-2 relative'>
                <BankAccountCard
                    accountType={sourceAccount.accountType}
                    balance={sourceAccount.balance}
                    currency={sourceAccount.currency}
                    className='flex-1 min-w-0 h-32 pointer-events-none'
                />
                <TransferIcon className='absolute z-10 w-10 h-10 bg-white rounded-full p-1 inset-1/2 transform -translate-x-1/2 -translate-y-1/2' />
                <BankAccountCard
                    accountType={targetAccount.accountType}
                    balance={targetAccount.balance}
                    currency={targetAccount.currency}
                    className='flex-1 min-w-0 h-32 pointer-events-none'
                />
            </div>
            <div>
                <p className='text-3xl text-center mb-2'>
                    {formatCurrency(targetCurrency, targetAmount)}
                </p>
                <div className='flex flex-col gap-3 bg-gray-100 p-3 rounded-md'>
                    <div>
                        <Label
                            label={t("sourceAccount")}
                            className='text-gray-600 mb-0'
                        />
                        <p className='text-gray-800'>
                            <span className='capitalize'>
                                {sourceAccount.accountType}
                            </span>
                            <span> | {sourceAccount.description}</span>
                        </p>
                    </div>
                    <div>
                        <Label
                            label={t("targetAccount")}
                            className='text-gray-600 mb-0'
                        />
                        <p className='text-gray-800'>
                            <span className='capitalize'>
                                {targetAccount.accountType}
                            </span>
                            <span> | {targetAccount.description}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewTransfer;
