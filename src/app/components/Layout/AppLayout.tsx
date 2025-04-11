"use client";

import React, { ReactNode } from "react";
import Header from "@/app/components/Layout/Header";
import MobileMenu from "@/app/components/Layout/Menu/MobileMenu";
import DesktopMenu from "@/app/components/Layout/Menu/DesktopMenu";

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
