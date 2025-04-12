import React from "react";
import BankAccountForm from "@/features/bank-accounts/components/BankAccountForm";
import { createBankAccount } from "@/features/bank-accounts/actions";
import { use } from "react";
import { Locale, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

type Props = {
    params: Promise<{ locale: Locale }>;
};

export default function CreateBankAccountPage({ params }: Props) {
    const { locale } = use(params);

    // Enable static rendering
    setRequestLocale(locale);

    const t = useTranslations("NewBankAccountPage");

    return (
        <section className='m-2 flex flex-col items-center'>
            <div className='w-96'>
                <BankAccountForm
                    title={t("title")}
                    callback={createBankAccount}
                />
            </div>
        </section>
    );
}
