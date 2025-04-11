import React, { useMemo, useTransition } from "react";
import Select, { SingleValue } from "react-select";
import { LOCALES_OPTIONS } from "@/app/components/LocaleSelector/constants";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";

const LocaleSelector = () => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const locale = useLocale();

    const onChange = (
        locale: SingleValue<{ label: string; value: string }>
    ) => {
        startTransition(() => {
            router.replace(
                // @ts-expect-error -- TypeScript will validate that only known `params`
                // are used in combination with a given `pathname`. Since the two will
                // always match for the current route, we can skip runtime checks.
                { pathname, params },
                { locale: locale?.value }
            );
        });
    };

    const defaultValue = useMemo(
        () => LOCALES_OPTIONS.find((l) => l.value === locale),
        [locale]
    );

    return (
        <Select
            isDisabled={isPending}
            isSearchable={false}
            options={LOCALES_OPTIONS}
            defaultValue={defaultValue}
            onChange={onChange}
            classNames={{
                control: () =>
                    "!bg-transparent !rounded-lg !p-1 !ring-0 !outline-none !border-none !cursor-pointer",
                option: (state) =>
                    state.isSelected
                        ? "!bg-blue-700 !cursor-pointer"
                        : "bg-white !cursor-pointer",
                menu: () => "bg-gray-50 !z-20",
                placeholder: () => "!text-white !text-sm",
                singleValue: () => "!text-white",
                input: () => "!text-white",
            }}
        />
    );
};

export default LocaleSelector;
