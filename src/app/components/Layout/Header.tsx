"use client";

import MenuIcon from "@/assets/icons/menu.svg";
import { useDispatch } from "react-redux";
import { toggleMenu } from "@/lib/store/slices/AppStateSlice";
import Link from "next/link";
import LocaleSelector from "@/app/components/LocaleSelector/LocaleSelector";

const Header = () => {
    const dispatch = useDispatch();

    const onClick = () => dispatch(toggleMenu());

    return (
        <header className='fixed top-0 w-full bg-gradient-to-r from-blue-900 to-blue-950 px-3 py-3 z-10'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                    <button
                        type='button'
                        onClick={onClick}
                        className='p-2 text-sm text-gray-500 rounded-lg focus:outline-none cursor-pointer'
                    >
                        <MenuIcon className='w-6 h-6 text-white' />
                    </button>
                    <Link href='/'>
                        <p className='text-xl font-semibold text-white'>Bank</p>
                    </Link>
                </div>
                <LocaleSelector />
            </div>
        </header>
    );
};

export default Header;
