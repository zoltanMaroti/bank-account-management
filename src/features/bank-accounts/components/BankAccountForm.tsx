"use client";

import React, {
    useState,
    useTransition,
    useCallback,
    ChangeEvent,
} from "react";
import Input from "@/features/ui/components/Input";
import { SingleValue } from "react-select";
import { useForm, SubmitHandler } from "react-hook-form";
import BankAccountCard from "@/features/bank-accounts/components/BankAccountCard";
import BankAccountTypeSelector from "@/features/bank-accounts/components/BankAccountTypeSelector";
import { BankAccountFormValues } from "@/features/bank-accounts/types";
import { AccountType } from "@/features/bank-accounts/types";
import { BankAccount } from "@/features/bank-accounts/types";
import { Currency, CurrencyOption } from "@/features/currencies/types";
import { DEFAULT_BANK_ACCOUNT_TYPE } from "@/features/bank-accounts/constants";
import Title from "@/features/ui/components/Title";
import Button from "@/features/ui/components/Button";
import CurrencySelector from "@/features/currencies/components/CurrencySelector";
import { useTranslations } from "next-intl";
import DeleteBankAccountButton from "@/features/bank-accounts/components/DeleteBankAccountButton";
import { hasBalance } from "@/features/bank-accounts/utils";

type Props = {
    title: string;
    bankAccount?: BankAccount;
    callback: (
        data: BankAccountFormValues,
        id?: string
    ) => Promise<BankAccount | never>;
};

const BankAccountForm = ({ title, bankAccount, callback }: Props) => {
    const [isPending, startTransition] = useTransition();
    const [description, setDescription] = useState(bankAccount?.description);
    const [currency, setCurrency] = useState<Currency>(
        bankAccount?.currency as Currency
    );
    const [accountType, setAccountType] = useState<AccountType>(
        bankAccount?.accountType || DEFAULT_BANK_ACCOUNT_TYPE
    );

    const tBankAccountForm = useTranslations("BankAccountForm");
    const tSchema = useTranslations("Schema");

    const buttonText = isPending
        ? tBankAccountForm("submitButton.pending")
        : tBankAccountForm("submitButton.submit");

    const {
        register,
        control,
        setValue: setFormValue,
        handleSubmit,
        formState: { errors },
    } = useForm<BankAccountFormValues>({
        defaultValues: {
            accountType: bankAccount?.accountType,
            currency: bankAccount?.currency,
            description: bankAccount?.description,
        },
    });

    const onSubmit: SubmitHandler<BankAccountFormValues> = (data) => {
        startTransition(() => {
            callback(data, bankAccount?.id);
        });
    };

    const onChangeDescription = (e: ChangeEvent<HTMLInputElement>) =>
        setDescription(e.target.value);

    const onChangeAccountType = useCallback(
        (value: AccountType) => {
            setFormValue("accountType", value);
            setAccountType(value);
        },
        [setFormValue]
    );

    const onChangeCurrency = useCallback(
        (option: SingleValue<CurrencyOption>) => {
            setCurrency((option?.value as Currency) || "");
        },
        []
    );

    return (
        <>
            <BankAccountCard
                currency={currency}
                balance={bankAccount?.balance || 0}
                accountType={accountType}
                description={description}
                className='pointer-events-none'
            />
            <form
                className='relative bg-white rounded-md p-4 mt-6 w-full flex flex-col gap-3'
                onSubmit={handleSubmit(onSubmit)}
            >
                <Title title={title} />
                <hr className='border border-gray-100 mb-2' />
                {bankAccount && (
                    <div className='absolute top-4 right-4'>
                        <DeleteBankAccountButton
                            bankAccount={bankAccount}
                            isDisabled={hasBalance(bankAccount?.balance)}
                        />
                    </div>
                )}
                <BankAccountTypeSelector
                    onChange={onChangeAccountType}
                    hasError={!!errors?.accountType}
                    register={register}
                    defaultValue={accountType}
                />
                <CurrencySelector
                    control={control}
                    currency={bankAccount?.currency}
                    hasError={!!errors?.currency}
                    onChange={onChangeCurrency}
                />
                <Input
                    {...register("description", {
                        required: tSchema("required"),
                    })}
                    type='text'
                    id='description'
                    data-testid='account-description'
                    placeholder={tBankAccountForm("description.placeholder")}
                    label={tBankAccountForm("description.label")}
                    hasError={!!errors?.description}
                    errorMessage={errors?.description?.message}
                    onChange={onChangeDescription}
                    defaultValue={description}
                />

                <Button
                    data-testid='submit-account'
                    type='submit'
                    disabled={isPending}
                >
                    {buttonText}
                </Button>
            </form>
        </>
    );
};

export default BankAccountForm;
