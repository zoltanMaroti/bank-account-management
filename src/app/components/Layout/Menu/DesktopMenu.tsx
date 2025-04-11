import NavLink from "@/app/components/NavLink/NavLink";
import dashboardIcon from "@/assets/icons/dashboard.svg";
import signOutIcon from "@/assets/icons/signOut.svg";
import transferIcon from "@/assets/icons/transfer.svg";
import Link from "next/link";

const DesktopMenu = () => {
    return (
        <aside className='fixed top-0 left-0 w-64 transition-transform -translate-x-full bg-blue-950 sm:translate-x-0 h-full p-3 z-20'>
            <Link href='/'>
                <p className='text-2xl font-bold text-white p-2 pb-4'>Bank</p>
            </Link>
            <nav className='flex flex-col gap-1 space-y-2'>
                <NavLink href='/'>
                    <img
                        src={dashboardIcon.src}
                        alt='Dashboard'
                        className='w-5 h-5 text-gray-50'
                    />
                    <span className='ms-3'>Dashboard</span>
                </NavLink>
                <NavLink href='/transfer'>
                    <img
                        src={transferIcon.src}
                        alt='Transfer'
                        className='w-5 h-5 text-gray-50'
                    />
                    <span className='ms-3'>Transfer</span>
                </NavLink>
                <NavLink href='#'>
                    <img
                        src={signOutIcon.src}
                        alt='Sign out'
                        className='w-5 h-5 text-gray-50'
                    />
                    <span className='ms-3'>Sign Out</span>
                </NavLink>
            </nav>
        </aside>
    );
};

export default DesktopMenu;
