import React from "react";
import BankAccountForm from "@/features/bank-accounts/components/BankAccountForm";
import { fetchBankAccount } from "@/features/bank-accounts/services";
import { notFound } from "next/navigation";
import { updateBankAccount } from "@/features/bank-accounts/actions";
import { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
    params: { id: string; locale: Locale };
};

export default async function EditBankAccountPage({ params }: Props) {
    const { id, locale } = params;
    const bankAccount = await fetchBankAccount(id);

    // Enable static rendering
    setRequestLocale(locale);

    const t = await getTranslations({
        locale,
        namespace: "EditBankAccountPage",
    });

    if (!bankAccount) {
        notFound();
    }

    return (
        <section className='m-2 flex flex-col items-center'>
            <div className='w-96'>
                <BankAccountForm
                    title={t("title")}
                    bankAccount={bankAccount}
                    callback={updateBankAccount}
                />
            </div>
        </section>
    );
}
