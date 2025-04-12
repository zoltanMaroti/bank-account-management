import { useEffect, useState } from "react";

export const useDebounce = <T>(value: T, delay: number = 300): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const debounce = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(debounce);
    }, [value, delay]);

    return debouncedValue;
};
