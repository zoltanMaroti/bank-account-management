import React, { ReactNode } from "react";
import Header from "@/features/ui/components/Header";
import DesktopMenu from "@/features/ui/components/DesktopMenu";
import dynamic from "next/dynamic";

const MobileMenu = dynamic(() => import("@/features/ui/components/MobileMenu"));

type Props = {
    children: ReactNode;
};

const AppLayout = ({ children }: Props) => {
    return (
        <>
            <Header />
            <MobileMenu />
            <DesktopMenu />
            <main className='relative top-16 sm:ml-64 p-4 transition-all'>
                {children}
            </main>
        </>
    );
};

export default AppLayout;
