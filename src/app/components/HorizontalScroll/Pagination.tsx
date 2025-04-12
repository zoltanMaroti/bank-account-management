import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
    pages: number;
    scrollPosition: number;
    onClick: (index: number) => void;
};

const Pagination = ({ pages, scrollPosition, onClick }: Props) => {
    return (
        <div className='flex justify-center'>
            {[...Array(pages)].map((_, index) => (
                <button
                    key={index}
                    onClick={() => onClick(index)}
                    className={twMerge(
                        "h-2 w-2 rounded-full mx-1 cursor-pointer",
                        scrollPosition === index ? "bg-gray-800" : "bg-gray-400"
                    )}
                />
            ))}
        </div>
    );
};

export default Pagination;
