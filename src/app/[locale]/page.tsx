import { fetchBankAccounts } from "@/features/bank-accounts/services";
import BankAccounts from "@/features/bank-accounts/components/BankAccounts";

export default async function HomePage() {
    const [bankAccounts] = await Promise.all([fetchBankAccounts()]);

    return (
        <div className='flex flex-col gap-3'>
            <BankAccounts bankAccounts={bankAccounts} />
        </div>
    );
}
