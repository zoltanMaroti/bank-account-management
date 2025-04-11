import React from "react";

const Title = ({ title, subTitle }: { title: string; subTitle?: string }) => {
    return (
        <>
            <h1 className='flex-1 text-xl font-bold text-center'>{title}</h1>
            <p className='text-center'>{subTitle}</p>
        </>
    );
};

export default Title;
