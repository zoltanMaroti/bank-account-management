import React from "react";

type Props = {
    htmlFor?: string;
    hasError: boolean;
    message?: string;
};

const ErrorMessage = ({ htmlFor, hasError, message }: Props) => {
    if (!hasError || !message) {
        return;
    }

    return (
        <label htmlFor={htmlFor} className='block mt-2 text-sm text-red-700'>
            {message}
        </label>
    );
};

export default ErrorMessage;
