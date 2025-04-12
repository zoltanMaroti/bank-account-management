import React from "react";

type Props = {
    title: string;
    subTitle?: string;
};

const Title = ({ title, subTitle }: Props) => {
    return (
        <>
            <h1 className='flex-1 text-xl font-bold text-center'>{title}</h1>
            {subTitle ? <p className='text-center'>{subTitle}</p> : null}
        </>
    );
};

export default Title;
