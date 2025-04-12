"use client";

import React, {
    useMemo,
    useTransition,
    useCallback,
    ChangeEventHandler,
} from "react";
import MoneyIcon from "@/assets/icons/money.svg";
import CurrencySelector from "@/features/transfer/components/TransferCurrencySelector";
import { BankAccount } from "@/features/bank-accounts/types";
import { TransferFundsFormValues } from "@/features/transfer/types";
import { CurrencyConversion } from "@/features/currencies/types";
import { DEFAULT_CURRENCY } from "@/features/currencies/constants";
import { useForm, SubmitHandler } from "react-hook-form";
import {
    convertBalanceToCurrency,
    getCurrencyMultiplier,
} from "@/features/transfer/utils";
import BankAccountSelector from "@/features/bank-accounts/components/BankAccountSelector";
import { twMerge } from "tailwind-merge";
import Label from "@/features/ui/components/Label";
import ErrorMessage from "@/features/ui/components/ErrorMessage";
import CurrencyConversionInfo from "@/features/currencies/components/CurrencyConversionInfo";
import Title from "@/features/ui/components/Title";
import Button from "@/features/ui/components/Button";
import Stepper from "@/features/ui/components/Stepper";
import { useStepper } from "@/features/ui/hooks";
import { steps } from "@/features/ui/constants";
import ReviewTransfer from "@/features/transfer/components/ReviewTransfer";
import { MINIMUM_TRANSFER_AMOUNT } from "@/features/transfer/constants";
import { validateTargetAmount } from "@/features/transfer/utils";
import { createTransaction } from "@/features/transfer/actions";
import { useTranslations } from "next-intl";

const TransferFundsForm = ({
    accounts,
    currencyConversion,
}: {
    accounts: BankAccount[];
    currencyConversion: CurrencyConversion;
}) => {
    const tTransfer = useTranslations("TransferFundsPage");

    const {
        register,
        control,
        watch,
        trigger,
        clearErrors,
        handleSubmit,
        resetField,
        formState: { errors },
    } = useForm<TransferFundsFormValues>();

    const sourceAccount = watch("sourceAccount");
    const targetAccount = watch("targetAccount");
    const targetAmount = watch("targetAmount", 0);
    const targetCurrency = watch("targetCurrency", DEFAULT_CURRENCY);

    const [isPending, startTransition] = useTransition();

    const onSubmit: SubmitHandler<TransferFundsFormValues> = (data) => {
        startTransition(async () => {
            await createTransaction(data, currencyConversion);
        });
    };

    const { currentStep, previousStep, nextStep, isFirstStep, isLastStep } =
        useStepper({
            steps,
            trigger,
            callback: handleSubmit(onSubmit),
        });

    const onChangeSourceAccount = useCallback(() => {
        clearErrors("sourceAccount");

        // Reset target account id to prevent selecting the source as target
        resetField("targetAccount");
    }, [clearErrors, resetField]);

    const onChangeTargetAccount = useCallback(
        () => clearErrors("targetAccount"),
        [clearErrors]
    );

    const onChangeTargetAmount: ChangeEventHandler<HTMLInputElement> =
        useCallback(() => clearErrors("targetAmount"), [clearErrors]);

    const eligibleTargetAccounts = useMemo(
        () => accounts.filter((account) => account.id !== sourceAccount?.id),
        [accounts, sourceAccount]
    );

    const currencyMultiplier = getCurrencyMultiplier(
        currencyConversion,
        sourceAccount?.currency,
        targetCurrency
    );

    const currencyConvertedBalance = convertBalanceToCurrency(
        sourceAccount?.balance,
        currencyMultiplier
    );

    const showCurrencyConversion =
        sourceAccount &&
        targetCurrency &&
        targetCurrency !== sourceAccount.currency;

    const showReviewTransfer =
        isLastStep && sourceAccount && targetAccount && targetAmount;

    const buttonText = isLastStep
        ? isPending
            ? tTransfer("submitButton.pending")
            : tTransfer("submitButton.label")
        : tTransfer("continue");

    return (
        <section className='relative bg-white rounded-md p-4 mt-6 w-full flex flex-col gap-3'>
            <Stepper steps={steps} currentStep={currentStep} />
            <Title
                title={tTransfer("title")}
                subTitle={tTransfer("subtitle")}
            />
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col gap-3'
            >
                {isFirstStep && (
                    <>
                        <BankAccountSelector
                            label={tTransfer("sourceAccount")}
                            name='sourceAccount'
                            control={control}
                            accounts={accounts}
                            hasError={!!errors?.sourceAccount}
                            onChange={onChangeSourceAccount}
                            defaultValue={sourceAccount}
                            value={sourceAccount}
                        />

                        {sourceAccount && (
                            <BankAccountSelector
                                id={sourceAccount.id}
                                label={tTransfer("targetAccount")}
                                name='targetAccount'
                                control={control}
                                accounts={eligibleTargetAccounts}
                                hasError={!!errors?.targetAccount}
                                onChange={onChangeTargetAccount}
                                value={targetAccount}
                                defaultValue={targetAccount}
                            />
                        )}

                        {targetAccount && (
                            <div>
                                <Label
                                    htmlFor='targetAmount'
                                    label={tTransfer("targetAmount.label")}
                                    hasError={!!errors?.targetAmount}
                                />
                                <div className='w-full mx-auto flex'>
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
                                                errors?.targetAmount &&
                                                    "border-red-700 border-r-1 focus:ring-red-700 focus:border-red-700 outline-none"
                                            )}
                                            placeholder={tTransfer(
                                                "targetAmount.placeholder"
                                            )}
                                            {...register(
                                                "targetAmount",
                                                validateTargetAmount(
                                                    targetCurrency,
                                                    currencyConvertedBalance
                                                )
                                            )}
                                            onChange={onChangeTargetAmount}
                                        />
                                    </div>
                                    <CurrencySelector
                                        control={control}
                                        name='targetCurrency'
                                    />
                                </div>

                                <ErrorMessage
                                    htmlFor='targetAmount'
                                    hasError={!!errors?.targetAmount}
                                    message={errors?.targetAmount?.message}
                                />
                            </div>
                        )}

                        {showCurrencyConversion && (
                            <CurrencyConversionInfo
                                sourceCurrency={sourceAccount?.currency}
                                targetCurrency={targetCurrency}
                                multiplier={currencyMultiplier}
                            />
                        )}
                    </>
                )}

                {showReviewTransfer && (
                    <ReviewTransfer
                        sourceAccount={sourceAccount}
                        targetAccount={targetAccount}
                        targetAmount={targetAmount}
                        targetCurrency={targetCurrency}
                    />
                )}

                <Button
                    data-testid='submit-button'
                    type='button'
                    onClick={nextStep}
                    disabled={isPending}
                >
                    {buttonText}
                </Button>

                {!isFirstStep && (
                    <button
                        data-testid='back-button'
                        type='button'
                        className='cursor-pointer'
                        onClick={previousStep}
                        disabled={isPending}
                    >
                        {tTransfer("back")}
                    </button>
                )}
            </form>
        </section>
    );
};

export default TransferFundsForm;
