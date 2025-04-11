"use client";

import { useTranslations } from "next-intl";
import { RootState } from "@/lib/store/store";
import { useSelector } from "react-redux";

export default function HomePage() {
    const t = useTranslations("HomePage");
    const isMenuOpen = useSelector(
        (state: RootState) => state.appState.isMenuOpen
    );

    return (
        <div>
            <h1>{t("title")}</h1>
            <p>Is menu open?: {isMenuOpen}</p>
        </div>
    );
}
