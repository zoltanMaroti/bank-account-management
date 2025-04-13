import { ChangeEventHandler, useCallback } from "react";
import BankAccountSelector from "@/features/bank-accounts/components/BankAccountSelector";
import Label from "@/features/ui/components/Label";
import TargetAmountSelector from "@/features/transfer/components/TargetAmountSelector";
import CurrencySelector from "@/features/transfer/components/TransferCurrencySelector";
import ErrorMessage from "@/features/ui/components/ErrorMessage";
import { BankAccount } from "@/features/bank-accounts/types";
import CurrencyConversionInfo from "@/features/currencies/components/CurrencyConversionInfo";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import { DEFAULT_CURRENCY } from "@/features/currencies/constants";

type Props = {
    accounts: BankAccount[];
    targetAccounts: BankAccount[];
    balance: number;
    currencyMultiplier: number;
};

const TransferDetails = ({
    accounts,
    targetAccounts,
    balance,
    currencyMultiplier,
}: Props) => {
    const {
        watch,
        formState: { errors },
        clearErrors,
        resetField,
    } = useFormContext();
    const t = useTranslations("TransferFundsPage");

    const sourceAccount = watch("sourceAccount");
    const targetAccount = watch("targetAccount");
    const targetCurrency = watch("targetCurrency", DEFAULT_CURRENCY);

    const showCurrencyConversion =
        sourceAccount &&
        targetCurrency &&
        targetCurrency !== sourceAccount.currency;

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

    return (
        <>
            <BankAccountSelector
                label={t("sourceAccount")}
                name='sourceAccount'
                accounts={accounts}
                hasError={!!errors?.sourceAccount}
                onChange={onChangeSourceAccount}
                defaultValue={sourceAccount}
                value={sourceAccount}
            />

            {sourceAccount ? (
                <BankAccountSelector
                    id={sourceAccount.id}
                    label={t("targetAccount")}
                    name='targetAccount'
                    accounts={targetAccounts}
                    hasError={!!errors?.targetAccount}
                    onChange={onChangeTargetAccount}
                    value={targetAccount}
                    defaultValue={targetAccount}
                />
            ) : null}

            {targetAccount ? (
                <div>
                    <Label
                        htmlFor='targetAmount'
                        label={t("targetAmount.label")}
                        hasError={!!errors?.targetAmount}
                    />
                    <div className='w-full mx-auto flex'>
                        <TargetAmountSelector
                            hasError={!!errors?.targetAmount}
                            onChange={onChangeTargetAmount}
                            currency={targetCurrency}
                            balance={balance}
                        />
                        <CurrencySelector name='targetCurrency' />
                    </div>
                    <ErrorMessage
                        htmlFor='targetAmount'
                        hasError={!!errors?.targetAmount}
                        message={errors?.targetAmount?.message?.toString()}
                    />
                    {showCurrencyConversion && (
                        <CurrencyConversionInfo
                            sourceCurrency={sourceAccount?.currency}
                            targetCurrency={targetCurrency}
                            multiplier={currencyMultiplier}
                        />
                    )}
                </div>
            ) : null}
        </>
    );
};

export default TransferDetails;
