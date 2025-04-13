"use client";

import React, { useMemo, useTransition } from "react";
import { BankAccount } from "@/features/bank-accounts/types";
import { TransferFundsFormValues } from "@/features/transfer/types";
import { CurrencyRates } from "@/features/currencies/types";
import { DEFAULT_CURRENCY } from "@/features/currencies/constants";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import {
    convertBalanceToCurrency,
    getCurrencyMultiplier,
} from "@/features/transfer/utils";
import Title from "@/features/ui/components/Title";
import Button from "@/features/ui/components/Button";
import Stepper from "@/features/ui/components/Stepper";
import { useStepper } from "@/features/ui/hooks";
import { steps } from "@/features/ui/constants";
import ReviewTransfer from "@/features/transfer/components/ReviewTransfer";
import { createTransaction } from "@/features/transfer/actions";
import { useTranslations } from "next-intl";
import TransferDetails from "@/features/transfer/components/TransferDetails";

type Props = {
    accounts: BankAccount[];
    currencyRates: CurrencyRates;
};

const TransferFundsForm = ({ accounts, currencyRates }: Props) => {
    const methods = useForm<TransferFundsFormValues>();

    const [isPending, startTransition] = useTransition();
    const t = useTranslations("TransferFundsPage");

    const sourceAccount = methods.watch("sourceAccount");
    const targetAccount = methods.watch("targetAccount");
    const targetAmount = methods.watch("targetAmount", 0);
    const targetCurrency = methods.watch("targetCurrency", DEFAULT_CURRENCY);

    const buttonText = isPending
        ? t("submitButton.pending")
        : t("submitButton.label");

    const eligibleTargetAccounts = useMemo(
        () => accounts.filter((account) => account.id !== sourceAccount?.id),
        [accounts, sourceAccount]
    );

    const currencyMultiplier = getCurrencyMultiplier(
        currencyRates,
        sourceAccount?.currency,
        targetCurrency
    );

    const currencyConvertedBalance = convertBalanceToCurrency(
        sourceAccount?.balance,
        currencyMultiplier
    );

    const onSubmit: SubmitHandler<TransferFundsFormValues> = (data) => {
        startTransition(async () => {
            await createTransaction(data, currencyRates);
        });
    };

    const { currentStep, previousStep, nextStep, isLastStep } = useStepper({
        steps,
        trigger: methods.trigger,
        callback: methods.handleSubmit(onSubmit),
    });

    const formSteps = [
        <TransferDetails
            key='transfer-details'
            accounts={accounts}
            targetAccounts={eligibleTargetAccounts}
            balance={currencyConvertedBalance}
            currencyMultiplier={currencyMultiplier}
        />,
        <ReviewTransfer
            key='review-transfer'
            sourceAccount={sourceAccount}
            targetAccount={targetAccount}
            targetAmount={targetAmount}
            targetCurrency={targetCurrency}
        />,
    ];

    return (
        <FormProvider {...methods}>
            <section className='relative bg-white rounded-md p-4 mt-6 w-full flex flex-col gap-3'>
                <Stepper steps={steps} currentStep={currentStep} />
                <Title title={t("title")} subTitle={t("subtitle")} />
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className='flex flex-col gap-3'
                >
                    {formSteps[currentStep]}

                    <Button
                        data-testid='submit-button'
                        type='button'
                        onClick={nextStep}
                        disabled={isPending}
                    >
                        {isLastStep ? buttonText : t("continue")}
                    </Button>

                    {isLastStep ? (
                        <button
                            data-testid='back-button'
                            type='button'
                            className='cursor-pointer'
                            onClick={previousStep}
                            disabled={isPending}
                        >
                            {t("back")}
                        </button>
                    ) : null}
                </form>
            </section>
        </FormProvider>
    );
};

export default TransferFundsForm;
