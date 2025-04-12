import { BankAccount } from "@/features/bank-accounts/types";
import HorizontalScroll from "@/features/ui/components/HorizontalScroll";
import BankAccountCard from "@/features/bank-accounts/components/BankAccountCard";

type Props = {
    bankAccounts: BankAccount[];
};

const BankAccountsCarousel = ({ bankAccounts }: Props) => {
    return (
        <div className='flex gap-2 w-full'>
            <div className='flex-grow overflow-hidden'>
                <HorizontalScroll>
                    {bankAccounts.map((account) => (
                        <BankAccountCard key={account.id} {...account} />
                    ))}
                </HorizontalScroll>
            </div>
        </div>
    );
};

export default BankAccountsCarousel;
