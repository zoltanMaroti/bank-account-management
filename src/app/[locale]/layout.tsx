import { ReactNode } from "react";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import StoreProvider from "@/lib/store/providers/StoreProvider";
import { Metadata } from "next";
import { Geist } from "next/font/google";
import AppLayout from "@/features/ui/components/AppLayout";
import "@/app/globals.css";
import { getTranslations } from "next-intl/server";

const geist = Geist({
    subsets: ["latin"],
});

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;

    const t = await getTranslations({
        locale: locale,
        namespace: "Metadata",
    });

    return {
        title: t("title"),
        description: t("description"),
    };
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: ReactNode;
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
