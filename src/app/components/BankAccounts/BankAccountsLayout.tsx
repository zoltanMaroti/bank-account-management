import { ReactNode, ChangeEvent } from "react";
import SearchBankAccount from "@/app/components/SearchBankAccount/SearchBankAccount";
import { useTranslations } from "next-intl";

type Props = {
    children: ReactNode;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    searchTerm: string;
};

const BankAccountsLayout = ({ children, onChange, searchTerm }: Props) => {
    const t = useTranslations("DashboardPage");

    return (
        <section className='flex flex-col gap-4 m-2 min-h-64'>
            <div className='flex justify-between flex-col gap-2 md:flex-row md:items-center'>
                <h1 className='flex-1 text-2xl font-bold'>{t("title")}</h1>
                <SearchBankAccount
                    onChange={onChange}
                    searchTerm={searchTerm}
                />
            </div>
            {children}
        </section>
    );
};

export default BankAccountsLayout;
