import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import StoreProvider from "@/features/bank-accounts/providers/StoreProvider";
import { Metadata } from "next";
import { Geist } from "next/font/google";
import AppLayout from "@/features/ui/components/AppLayout";
import "@/app/globals.css";

const geist = Geist({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Bank Accounts Management",
    description: "Overseeing financial accounts and transactions.",
};

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    return (
        <html lang={locale}>
            <body className={geist.className}>
                <NextIntlClientProvider>
                    <StoreProvider>
                        <AppLayout>{children}</AppLayout>
                    </StoreProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
