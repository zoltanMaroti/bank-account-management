import React, { useTransition } from "react";
import WarningIcon from "@/assets/icons/warning.svg";
import CloseIcon from "@/assets/icons/close.svg";
import { BankAccount } from "@/app/components/BankAccountCard/types";
import Button from "@/app/components/Button/Button";
import { useTranslations } from "next-intl";

const DeleteConfirmationModal = ({
    bankAccount,
    onCancel,
    onDelete,
}: {
    bankAccount: BankAccount;
    onCancel: () => void;
    onDelete: (account: BankAccount) => Promise<void>;
}) => {
    const [isPending, startTransition] = useTransition();

    const t = useTranslations("DeleteBankAccount");

    const buttonText = isPending
        ? t("deleteButton.pending")
        : t("deleteButton.submit");

    const onClickDelete = () => {
        startTransition(() => {
            onDelete(bankAccount);
        });
    };

    return (
        <div className='fixed flex top-0 left-0 z-20 w-screen h-screen items-center justify-center bg-black/50'>
            <div className='w-full max-w-sm p-4 text-gray-500 bg-white rounded-lg shadow'>
                <div className='flex'>
                    <WarningIcon className='h-8 w-8 text-red-700' />
                    <div className='ms-3 text-sm'>
                        <span className='mb-1 text-sm font-semibold text-gray-900'>
                            {t("confirmation.title")}
                        </span>
                        <div className='mb-2 text-sm'>
                            {t("confirmation.subtitle")}
                        </div>
                        <div className='grid grid-cols-2 gap-2'>
                            <Button
                                type='button'
                                disabled={isPending}
                                onClick={onClickDelete}
                                className='text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300'
                            >
                                {buttonText}
                            </Button>
                            <Button
                                type='button'
                                onClick={onCancel}
                                className='text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200'
                            >
                                {t("cancelButton.label")}
                            </Button>
                        </div>
                    </div>
                    <button
                        type='button'
                        onClick={onCancel}
                        className='ms-auto -mx-1.5 -my-1.5 bg-white items-center justify-center text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 cursor-pointer'
                    >
                        <CloseIcon className='h-3 w-3' />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
