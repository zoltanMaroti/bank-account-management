import React from "react";
import BankAccountForm from "@/app/components/BankAccountForm/BankAccountForm";
import { fetchBankAccount } from "@/app/components/BankAccounts/services";
import { notFound } from "next/navigation";
import { updateBankAccount } from "@/app/components/BankAccountForm/actions";

export default async function EditBankAccountPage({
    params: { id },
}: {
    params: { id: string | string[] };
}) {
    const bankAccount = await fetchBankAccount(id);

    if (!bankAccount) {
        notFound();
    }

    return (
        <section className='m-2 flex flex-col items-center'>
            <div className='w-96'>
                <BankAccountForm
                    title={"Edit account"}
                    bankAccount={bankAccount}
                    callback={updateBankAccount}
                />
            </div>
        </section>
    );
}
