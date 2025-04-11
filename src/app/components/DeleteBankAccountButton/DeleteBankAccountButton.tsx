"use client";

import React, { useState } from "react";
import DeleteIcon from "@/assets/icons/delete.svg";
import DeleteConfirmationModal from "@/app/components/DeleteBankAccountButton/DeleteConfirmationModal";
import { deleteBankAccount } from "@/app/components/DeleteBankAccountButton/actions";
import { BankAccount } from "@/app/components/BankAccountCard/types";
import { Tooltip } from "react-tooltip";
import { useTranslations } from "next-intl";

const DeleteBankAccountButton = ({
    bankAccount,
    isDisabled,
}: {
    bankAccount: BankAccount;
    isDisabled: boolean;
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const t = useTranslations("DeleteBankAccount");

    const tooltipText = isDisabled ? t("tooltip.disabled") : t("tooltip.label");

    const toggleModal = () => setIsModalOpen((prevState) => !prevState);

    return (
        <>
            {isModalOpen ? (
                <DeleteConfirmationModal
                    bankAccount={bankAccount}
                    onCancel={toggleModal}
                    onDelete={deleteBankAccount}
                />
            ) : null}
            <button
                data-testid='delete-account-button'
                type='button'
                onClick={toggleModal}
                disabled={isDisabled}
                data-tooltip-id='delete-tooltip'
                data-tooltip-place='bottom'
                data-tooltip-content={tooltipText}
                className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1 cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed'
            >
                <DeleteIcon className='w-5 h-5' />
            </button>
            <Tooltip id='delete-tooltip' className='!px-2 !py-1' opacity={1} />
        </>
    );
};

export default DeleteBankAccountButton;
