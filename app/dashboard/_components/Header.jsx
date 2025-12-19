"use client"
import Image from 'next/image';
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import Link from 'next/link';
import { LogOut, User as UserIcon, Settings, ChevronDown } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

function Header() {
    const path = usePathname();
    const { user, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className='glass-header flex p-4 items-center justify-between px-8 sticky top-0 z-50'>
            <Link href={"/dashboard"} className='flex items-center gap-2 hover:opacity-80 transition-opacity'>
                <Image src={'/logo.svg'} width={160} height={40} alt='logo' className='brightness-110' />
            </Link>

            <ul className='hidden md:flex gap-8 items-center'>
                {['Dashboard', 'Questions', 'Upgrade', 'How it works?'].map((item) => {
                    const itemPath = item === 'Dashboard' ? '/dashboard' : `/dashboard/${item.toLowerCase().split(' ')[0]}`;
                    const isActive = path === itemPath;
                    return (
                        <Link href={itemPath} key={item}>
                            <li className={`text-sm tracking-wide transition-all duration-300 cursor-pointer relative group
                            ${isActive ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-primary'}`}>
                                {item}
                                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 
                                ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                            </li>
                        </Link>
                    );
                })}
            </ul>

            <div className='relative'>
                {user ? (
                    <div className='flex items-center gap-3 bg-white/5 p-1.5 pl-3 rounded-full border border-white/10 hover:border-white/20 transition-all cursor-pointer group'
                        onClick={() => setDropdownOpen(!dropdownOpen)}>
                        <div className='flex flex-col items-end hidden sm:flex'>
                            <span className='text-[12px] font-bold text-foreground/90'>{user.name}</span>
                            <span className='text-[10px] text-muted-foreground'>{user.email.split('@')[0]}</span>
                        </div>
                        <div className='h-8 w-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold text-sm'>
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </div>
                ) : (
                    <div className='flex items-center gap-3'>
                        <Link href="/sign-in">
                            <button className='bg-primary/10 text-primary border border-primary/20 px-6 py-2 rounded-full text-sm font-bold hover:bg-primary/20 transition-all'>
                                Sign In
                            </button>
                        </Link>
                        <Link href="/sign-up">
                            <button className='bg-primary text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-primary/90 transition-all'>
                                Join Free
                            </button>
                        </Link>
                    </div>
                )}

                {dropdownOpen && (
                    <div className='absolute right-0 mt-3 w-56 glass-card rounded-2xl border-white/5 py-2 shadow-2xl animate-in fade-in slide-in-from-top-2'>
                        <div className='px-4 py-2 border-b border-white/5 mb-2'>
                            <p className='text-xs font-bold text-primary uppercase tracking-widest'>Profile</p>
                            <p className='text-sm font-medium truncate'>{user?.email}</p>
                        </div>
                        <button className='w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground'>
                            <Settings className='w-4 h-4' />
                            Settings
                        </button>
                        <button onClick={logout} className='w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-red-500/10 transition-colors text-red-500/80 hover:text-red-500'>
                            <LogOut className='w-4 h-4' />
                            Sign Out
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Header
