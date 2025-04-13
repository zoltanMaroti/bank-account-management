import { Currency } from "@/features/currencies/types";
import React from "react";

type Props = {
    sourceCurrency: Currency;
    multiplier: number;
    targetCurrency: Currency;
};

const CurrencyConversionInfo = ({
    sourceCurrency,
    multiplier,
    targetCurrency,
}: Props) => {
    return (
        <p className='text-sm text-gray-500 text-center'>
            <span>1 {sourceCurrency} </span>
            <span>
                ~ {multiplier} {targetCurrency}
            </span>
        </p>
    );
};

export default CurrencyConversionInfo;
