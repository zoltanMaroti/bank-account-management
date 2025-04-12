import { fetchBankAccounts } from "@/app/components/BankAccounts/services";
import BankAccounts from "@/app/components/BankAccounts/BankAccounts";

export default async function HomePage() {
    const [bankAccounts] = await Promise.all([fetchBankAccounts()]);

    return (
        <div className='flex flex-col gap-3'>
            <BankAccounts bankAccounts={bankAccounts} />
        </div>
    );
}
