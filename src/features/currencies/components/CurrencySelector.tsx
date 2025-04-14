import React, { useMemo } from "react";
import Select, { SingleValue } from "react-select";
import { Control, Controller } from "react-hook-form";
import { BankAccountFormValues } from "@/features/bank-accounts/types";
import { Currency, CurrencyOption } from "@/features/currencies/types";
import Label from "@/features/ui/components/Label";
import ErrorMessage from "@/features/ui/components/ErrorMessage";
import { CURRENCIES } from "@/features/currencies/constants";
import { useTranslations } from "next-intl";

type Props = {
    control: Control<BankAccountFormValues, unknown>;
    currency?: Currency;
    hasError: boolean;
    onChange: (option: SingleValue<CurrencyOption>) => void;
};

const CurrencySelector = ({ control, currency, hasError, onChange }: Props) => {
    const tSchema = useTranslations("Schema");
    const tCurrencySelector = useTranslations("CurrencySelector");

    const currencyOptions = useMemo(
        () =>
            CURRENCIES.map((currency) => ({
                value: currency,
                label: currency,
            })),
        []
    );

    return (
        <div>
            <Label
                htmlFor='currency'
                label={tCurrencySelector("label")}
                hasError={hasError}
            />
            <Controller
                name='currency'
                control={control}
                rules={{ required: tSchema("required") }}
                render={({ field }) => (
                    <Select
                        {...field}
                        placeholder={tCurrencySelector("placeholder")}
                        isSearchable={false}
                        options={currencyOptions}
                        defaultValue={currencyOptions.find(
                            (option) => option.value === currency
                        )}
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
                        onChange={(option: SingleValue<CurrencyOption>) => {
                            const selectedValue = option ? option.value : "";
                            field.onChange(selectedValue);
                            onChange(option);
                        }}
                        value={currencyOptions.find(
                            (option) => option.value === field.value
                        )}
                    />
                )}
            />
            <ErrorMessage
                htmlFor='currency'
                hasError={hasError}
                message={tSchema("required")}
            />
        </div>
    );
};

export default CurrencySelector;
