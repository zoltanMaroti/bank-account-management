import { formatCurrency } from "@/features/bank-accounts/utils";
import { Transaction } from "@/features/transfer/types";
import Label from "@/features/ui/components/Label";
import { useTranslations } from "next-intl";

type Props = {
    transaction: Transaction;
};

const TransactionCard = ({ transaction }: Props) => {
    const t = useTranslations("Transactions");

    return (
        <li className='grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] bg-white p-3 gap-4 rounded-md'>
            <div>
                <Label label={t("date")} className='text-gray-400 mb-0' />
                <p className='text-sm font-light'>
                    {new Date(transaction.timestamp * 1000).toLocaleString()}
                </p>
            </div>
            <div>
                <Label label={t("from")} className='text-gray-400 mb-0' />
                <p className='text-sm font-light'>
                    {transaction.sourceAccount.description}
                </p>
            </div>
            <div>
                <Label label={t("to")} className='text-gray-400 mb-0' />
                <p className='text-sm font-light'>
                    {transaction.targetAccount.description}
                </p>
            </div>
            <div>
                <Label label={t("amount")} className='text-gray-400 mb-0' />
                <p className='text-sm font-light'>
                    {formatCurrency(
                        transaction.targetCurrency,
                        transaction.targetAmount
                    )}
                </p>
            </div>
        </li>
    );
};

export default TransactionCard;
