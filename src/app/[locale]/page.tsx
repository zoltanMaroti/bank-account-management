import { fetchBankAccounts } from "@/features/bank-accounts/services";
import { fetchTransactions } from "@/features/transactions/services";
import BankAccounts from "@/features/bank-accounts/components/BankAccounts";
import Transactions from "@/features/transactions/components/Transactions";

export default async function HomePage() {
    const [bankAccounts, transactions] = await Promise.all([
        fetchBankAccounts(),
        fetchTransactions(),
    ]);

    return (
        <div className='flex flex-col gap-3'>
            <BankAccounts bankAccounts={bankAccounts} />
            <Transactions transactions={transactions} />
        </div>
    );
}
