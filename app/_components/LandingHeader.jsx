"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'
import { LogIn, UserPlus, LayoutDashboard } from 'lucide-react'

export default function LandingHeader() {
    const { user } = useAuth();

    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className='flex items-center justify-between p-6 px-8 md:px-20 lg:px-32 sticky top-0 z-50 backdrop-blur-sm bg-background/20 border-b border-white/5'
        >
            <Link href='/' className='flex items-center gap-2 hover:opacity-80 transition-opacity'>
                <Image src='/logo.svg' width='160' height='40' alt='logo' className='brightness-110' />
            </Link>

            <div className='flex items-center gap-4'>
                {user ? (
                    <Link href='/dashboard'>
                        <button className='flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 px-6 py-2.5 rounded-full text-sm font-bold hover:bg-primary/20 transition-all'>
                            <LayoutDashboard size={18} />
                            Dashboard
                        </button>
                    </Link>
                ) : (
                    <>
                        <Link href='/sign-in' className='hidden sm:block'>
                            <button className='text-sm font-bold text-muted-foreground hover:text-primary transition-colors px-4 py-2 flex items-center gap-2'>
                                <LogIn size={18} />
                                Sign In
                            </button>
                        </Link>
                        <Link href='/sign-up'>
                            <button className='bg-primary text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2'>
                                <UserPlus size={18} />
                                Join Free
                            </button>
                        </Link>
                    </>
                )}
            </div>
        </motion.header>
    )
}
