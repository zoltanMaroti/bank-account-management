"use client";

import React, { ReactNode } from "react";
import Header from "@/features/ui/components/Header";
import MobileMenu from "@/features/ui/components/MobileMenu";
import DesktopMenu from "@/features/ui/components/DesktopMenu";

const AppLayout = ({ children }: { children: ReactNode }) => {
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
