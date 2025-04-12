import React from "react";
import FileIcon from "@/assets/icons/file.svg";

const NoResults = ({ searchTerm }: { searchTerm: string }) => {
    return (
        <div className='flex flex-col items-center text-center mt-4'>
            <FileIcon className='h-14 w-14 mb-2 text-gray-400' />
            <p className='text-lg font-bold'>
                No results found for &quot;{searchTerm}&quot;
            </p>
            <p className='text-gray-600'>
                Please try again with another keyword
            </p>
        </div>
    );
};

export default NoResults;
