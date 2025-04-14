"use client";

import { twMerge } from "tailwind-merge";
import NavLink from "@/features/ui/components/NavLink";
import DashboardIcon from "@/assets/icons/dashboard.svg";
import TransferIcon from "@/assets/icons/transfer.svg";
import PlusIcon from "@/assets/icons/plus.svg";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { useTranslations } from "next-intl";

const MobileMenu = () => {
    const t = useTranslations("Menu");

    const isMenuOpen = useSelector(
        (state: RootState) => state.appState.isMenuOpen
    );

    return (
        <aside
            className={twMerge(
                "fixed right-full top-13 w-80 transition-transform bg-blue-950 h-full p-3 z-20",
                isMenuOpen ? "translate-x-full" : "-translate-x-full"
            )}
        >
            <nav className='flex flex-col gap-1 space-y-2'>
                <NavLink href='/'>
                    <DashboardIcon className='w-5 h-5 text-gray-50' />
                    <span className='ms-3'>{t("dashboard")}</span>
                </NavLink>
                <NavLink href='/account/open'>
                    <PlusIcon className='w-5 h-5 text-gray-50' />
                    <span className='ms-3'>{t("open")}</span>
                </NavLink>
                <NavLink href='/transfer'>
                    <TransferIcon className='w-5 h-5 text-gray-50' />
                    <span className='ms-3'>{t("transfer")}</span>
                </NavLink>
            </nav>
        </aside>
    );
};

export default MobileMenu;
