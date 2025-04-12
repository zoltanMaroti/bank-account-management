import React, { ChangeEvent } from "react";
import SearchIcon from "@/assets/icons/search.svg";
import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";

type Props = {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    searchTerm: string;
};

const SearchBankAccount = ({ onChange, searchTerm }: Props) => {
    const t = useTranslations("SearchBankAccount");

    return (
        <form
            className={twMerge(
                "relative bg-neutral-300 rounded-md hover:brightness-95 hover:focus-within:brightness-100",
                searchTerm && "hover:brightness-100"
            )}
        >
            <input
                type='search'
                data-testid='search'
                placeholder={t("placeholder")}
                onChange={onChange}
                className={twMerge(
                    "peer cursor-pointer relative w-full z-1 h-12 rounded-md bg-transparent pl-10 outline-none transition-all focus:cursor-text focus:pl-16 focus:pr-4 focus:bg-white focus:border focus:border-gray-400 md:w-12 md:focus:w-100",
                    searchTerm &&
                        "pl-16 pr-4 bg-white border border-gray-400 md:w-100"
                )}
            />
            <SearchIcon
                className={twMerge(
                    "absolute inset-y-0 my-auto h-8 w-12 stroke-gray-900 px-3.5 peer-focus:border-r peer-focus:border-gray-400 peer-focus:z-10",
                    searchTerm && "border-r border-gray-400 z-1"
                )}
            />
        </form>
    );
};

export default SearchBankAccount;
