"use client"
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {
    const path=usePathname();
    useEffect(()=>{
        console.log(path)

    },[])
  return (
    <div className='flex p-4 items-center justify-between bg-secondary'>
         
         <Image src={'/logo.svg'} width={160} height={100} alt='logo'/>
         <ul className='hidden md:flex gap-6 items-center justify-between bg-secondary shadow-2xs'>
            <li className={`hover:text-cyan-600 hover:font-bold transition-all cursor-pointer
                ${path=='/dashboard'&&'text-cyan-600 font-bold'}`}>Dashboard</li>
            <li className={`hover:text-cyan-600 hover:font-bold transition-all cursor-pointer
                ${path=='/dashboard/ques'&&'text-cyan-600 font-bold'}`}>Questions</li>
            <li className={`hover:text-cyan-600 hover:font-bold transition-all cursor-pointer
                ${path=='/dashboard/upgrade'&&'text-cyan-600 font-bold'}`}>Upgrade</li>
            <li className={`hover:text-cyan-600 hover:font-bold transition-all cursor-pointer
                ${path=='/dashboard/how'&&'text-cyan-600 font-bold'}`}>How it works?</li>
         </ul>
         <UserButton/>
    </div>
    
  )
}

export default Header