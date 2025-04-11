import React from "react";
import { BankAccountCardProps } from "@/app/components/BankAccountCard/types";
import Button from "@/app/components/Button/Button";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import savingsIcon from "@/assets/icons/savings.svg";
import currencyIcon from "@/assets/icons/currency.svg";
import salaryIcon from "@/assets/icons/salary.svg";
import { formatCurrency } from "@/app/components/BankAccountCard/utils";
import { useTranslations } from "next-intl";

const bankAccountIcons = {
    savings: (
        <img src={savingsIcon.src} alt='Savings icon' className='w-6 h-6' />
    ),
    currency: (
        <img src={currencyIcon.src} alt='Currency icon' className='w-6 h-6' />
    ),
    salary: <img src={salaryIcon.src} alt='Salary icon' className='w-6 h-6' />,
};

const BankAccountCard = ({
    id,
    currency,
    balance,
    accountType,
    description,
    className,
}: BankAccountCardProps) => {
    const tAccountType = useTranslations("BankAccountType");

    return (
        <Link
            href={`/account/${id}`}
            data-testid='account-card'
            className={twMerge(
                "flex flex-col justify-between relative bg-white h-40 min-w-64 p-3 rounded-md bg-cover text-white overflow-hidden",
                className
            )}
            style={{
                backgroundImage: `url(/images/accounts/${accountType}.png)`,
            }}
        >
            <div className='opacity-0 hover:opacity-100 duration-300 backdrop-blur-sm absolute inset-0 z-10 flex justify-center items-center'>
                <Button type='button' className='focus:ring-0'>
                    Edit
                </Button>
            </div>
            <div>
                <p className='capitalize'>{tAccountType(accountType || "")}</p>
                <p className='text-sm font-light'>{description}</p>
            </div>

            <p className='text-xl font-semibold'>
                {currency ? formatCurrency(currency, balance || 0) : null}
            </p>
            <span className='absolute bottom-4 right-4'>
                {accountType && bankAccountIcons[accountType]}
            </span>
        </Link>
    );
};

export default BankAccountCard;
