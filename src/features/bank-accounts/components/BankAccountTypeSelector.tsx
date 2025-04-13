import React from "react";
import SavingsIcon from "@/assets/icons/savings.svg";
import CurrencyIcon from "@/assets/icons/currency.svg";
import SalaryIcon from "@/assets/icons/salary.svg";
import { twMerge } from "tailwind-merge";
import { AccountType } from "@/features/bank-accounts/types";
import { useTranslations } from "next-intl";
import ErrorMessage from "@/features/ui/components/ErrorMessage";

type Props = {
    onChange: (value: AccountType) => void;
    hasError: boolean;
    defaultValue?: string;
};

const BankAccountTypeSelector = ({
    onChange,
    hasError,
    defaultValue,
}: Props) => {
    const tAccountType = useTranslations("BankAccountType");
    const tSchema = useTranslations("Schema");

    const onSelectAccountType = (value: string) => {
        onChange(value as AccountType);
    };

    return (
        <div>
            <label
                className={twMerge(
                    "block mb-2 text-sm text-gray-900",
                    hasError && "text-red-700"
                )}
            >
                {tAccountType("label")}
            </label>
            <div className='text-sm font-medium text-center text-gray-500 rounded-lg inline-flex shadow-sm w-full'>
                <label
                    htmlFor='savings'
                    className={twMerge(
                        "cursor-pointer w-full inline-flex items-center px-4 py-2 text-sm font-medium border border-gray-200 rounded-l-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700}",
                        hasError && "border-red-500",
                        defaultValue === "savings"
                            ? "text-blue-700 bg-gray-100"
                            : "text-gray-900 bg-white"
                    )}
                >
                    <input
                        type='radio'
                        id='savings'
                        name='savings'
                        className='hidden'
                        checked={defaultValue === "savings"}
                        onChange={() => onSelectAccountType("savings")}
                    />
                    <SavingsIcon className='w-4 h-4 me-2' />
                    {tAccountType("savings")}
                </label>
                <label
                    htmlFor='currency'
                    className={twMerge(
                        "cursor-pointer w-full inline-flex items-center px-4 py-2 text-sm font-medium border-t border-b border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700",
                        hasError && "border-red-500",
                        defaultValue === "currency"
                            ? "text-blue-700 bg-gray-100"
                            : "text-gray-900 bg-white"
                    )}
                >
                    <input
                        type='radio'
                        id='currency'
                        name='currency'
                        className='hidden'
                        checked={defaultValue === "currency"}
                        onChange={() => onSelectAccountType("currency")}
                    />
                    <CurrencyIcon className='w-4 h-4 me-2' />
                    {tAccountType("currency")}
                </label>
                <label
                    htmlFor='salary'
                    className={twMerge(
                        "cursor-pointer w-full inline-flex items-center px-4 py-2 text-sm font-medium border border-gray-200 rounded-r-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700",
                        hasError && "border-red-500",
                        defaultValue === "salary"
                            ? "text-blue-700 bg-gray-100"
                            : "text-gray-900 bg-white"
                    )}
                >
                    <input
                        type='radio'
                        id='salary'
                        name='salary'
                        className='hidden'
                        checked={defaultValue === "salary"}
                        onChange={() => onSelectAccountType("salary")}
                    />
                    <SalaryIcon className='w-4 h-4 me-2' />
                    {tAccountType("salary")}
                </label>
            </div>
            <ErrorMessage
                htmlFor='targetAmount'
                hasError={hasError}
                message={tSchema("required")}
            />
        </div>
    );
};

export default BankAccountTypeSelector;
