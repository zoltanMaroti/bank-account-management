import {
    useEffect,
    useState,
    useCallback,
    useTransition,
    ChangeEvent,
} from "react";
import { searchAccount } from "@/features/bank-accounts/actions";
import { BankAccount } from "@/features/bank-accounts/types";

export const useDebounce = <T>(value: T, delay: number = 300): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const debounce = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(debounce);
    }, [value, delay]);

    return debouncedValue;
};

export const useSearch = () => {
    const [isPending, startTransition] = useTransition();
    const [searchResult, setSearchResult] = useState<BankAccount[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm);

    const onChangeSearchTerm = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;

            setSearchTerm(e.target.value.trim());

            if (value === "") {
                onClear();
            }
        },
        []
    );

    const onClear = () => {
        setSearchResult([]);
        setSearchTerm("");
    };

    useEffect(() => {
        const search = async (searchTerm: string) => {
            const accounts = await searchAccount(searchTerm);
            setSearchResult(accounts);
        };

        if (debouncedSearchTerm.length) {
            startTransition(async () => {
                await search(debouncedSearchTerm);
            });
        }
    }, [debouncedSearchTerm]);

    return {
        onChangeSearchTerm,
        searchResult,
        debouncedSearchTerm,
        isPending,
    };
};
