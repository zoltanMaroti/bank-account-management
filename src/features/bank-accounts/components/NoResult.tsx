import React from "react";
import FileIcon from "@/assets/icons/file.svg";
import { useTranslations } from "next-intl";

type Props = {
    searchTerm: string;
};

const NoResults = ({ searchTerm }: Props) => {
    const t = useTranslations("SearchBankAccount");

    return (
        <div className='flex flex-col items-center text-center mt-4'>
            <FileIcon className='h-14 w-14 mb-2 text-gray-400' />
            <p className='text-lg font-bold'>
                {t("noResult.title", { searchTerm })}
            </p>
            <p className='text-gray-600'>{t("noResult.subtitle")}</p>
        </div>
    );
};

export default NoResults;
