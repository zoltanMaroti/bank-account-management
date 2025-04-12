import { BankAccount } from "@/app/components/BankAccountCard/types";
import HorizontalScroll from "@/app/components/HorizontalScroll/HorizontalScroll";
import BankAccountCard from "@/app/components/BankAccountCard/BankAccountCard";

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
