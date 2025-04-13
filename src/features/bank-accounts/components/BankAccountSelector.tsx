import React, { useMemo } from "react";
import Select, { SingleValue } from "react-select";
import { Controller, useFormContext } from "react-hook-form";
import { BankAccount } from "@/features/bank-accounts/types";
import { Currency } from "@/features/currencies/types";
import { formatCurrency } from "@/features/bank-accounts/utils";
import { TransferFundsFormValues } from "@/features/transfer/types";
import Label from "@/features/ui/components/Label";
import ErrorMessage from "@/features/ui/components/ErrorMessage";
import { useTranslations } from "next-intl";

const BankAccountSelector = ({
    id,
    name,
    label,
    accounts,
    hasError,
    onChange,
    defaultValue,
    value,
}: {
    id?: string;
    name: keyof TransferFundsFormValues;
    label: string;
    accounts: BankAccount[];
    hasError: boolean;
    onChange: () => void;
    defaultValue?: SingleValue<BankAccount>;
    value?: SingleValue<BankAccount>;
}) => {
    const { control } = useFormContext();
    const tBankAccountSelect = useTranslations("SelectBankAccount");
    const tSchema = useTranslations("Schema");

    const formatOptionLabel = ({
        currency,
        balance,
        accountType,
        description,
    }: {
        currency: string;
        balance: number;
        accountType: string;
        description?: string;
    }) => (
        <div data-testid={`${name}-selector-item`}>
            <div className='flex gap-2 justify-between'>
                <span>
                    <span>{currency} | </span>
                    <span className='capitalize'>{accountType}</span>
                </span>
                <div>{formatCurrency(currency as Currency, balance)}</div>
            </div>
            <div className='text-gray-400 text-sm'>{description}</div>
        </div>
    );

    const options: BankAccount[] = useMemo(
        () =>
            accounts.map((account) => ({
                ...account,
            })),
        [accounts]
    );

    return (
        <div data-testid={name}>
            <Label htmlFor={name} label={label} hasError={hasError} />
            <Controller
                name={name}
                control={control}
                rules={{ required: tSchema("required") }}
                render={({ field }) => (
                    <Select
                        {...field}
                        key={id}
                        value={value}
                        defaultValue={defaultValue}
                        classNames={{
                            control: () =>
                                hasError
                                    ? "!border-red-500 !bg-gray-50 !rounded-lg !focus:border-none !shadow-none !p-1"
                                    : "!border-gray-300 !bg-gray-50 !rounded-lg !p-1",
                            option: (state) =>
                                state.isSelected ? "!bg-blue-700" : "bg-white",
                            menu: () => "bg-gray-50 !z-20",
                            placeholder: () => "!text-gray-400 !text-sm",
                        }}
                        isSearchable={false}
                        formatOptionLabel={formatOptionLabel}
                        options={options}
                        placeholder={tBankAccountSelect("placeholder")}
                        getOptionValue={(option) => option.id}
                        onChange={(
                            selectedOption: SingleValue<BankAccount>
                        ) => {
                            field.onChange(selectedOption);
                            if (selectedOption) {
                                onChange();
                            }
                        }}
                    />
                )}
            />
            <ErrorMessage
                htmlFor={name}
                hasError={hasError}
                message={tSchema("required")}
            />
        </div>
    );
};

export default BankAccountSelector;
