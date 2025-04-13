import React, { ChangeEvent } from "react";
import MoneyIcon from "@/assets/icons/money.svg";
import { MINIMUM_TRANSFER_AMOUNT } from "@/features/transfer/constants";
import { twMerge } from "tailwind-merge";
import { useFormContext } from "react-hook-form";
import { validateTargetAmount } from "@/features/transfer/utils";
import { Currency } from "@/features/currencies/types";
import { useTranslations } from "next-intl";

type Props = {
    hasError: boolean;
    onChange: (value: ChangeEvent<HTMLInputElement>) => void;
    currency: Currency;
    balance: number;
};

const TargetAmountSelector = ({
    onChange,
    hasError,
    currency,
    balance,
}: Props) => {
    const { control } = useFormContext();

    const t = useTranslations("TransferFundsPage");

    return (
        <div className='relative w-full'>
            <div className='absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none'>
                <MoneyIcon className='w-4 h-4 text-gray-500' />
            </div>
            <input
                data-testid='target-amount'
                id='targetAmount'
                type='number'
                min={MINIMUM_TRANSFER_AMOUNT}
                className={twMerge(
                    "block p-2.5 w-full z-20 ps-10 text-sm text-gray-900 bg-gray-50 rounded-s-lg border-e-gray-50 border-e-2 border border-r-0 border-gray-300 focus:ring-blue-500 focus:border-blue-50",
                    hasError &&
                        "border-red-700 border-r-1 focus:ring-red-700 focus:border-red-700 outline-none"
                )}
                placeholder={t("targetAmount.placeholder")}
                {...control.register(
                    "targetAmount",
                    validateTargetAmount(currency, balance)
                )}
                onChange={onChange}
            />
        </div>
    );
};

export default TargetAmountSelector;
