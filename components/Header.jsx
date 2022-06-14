import React from 'react'
import Link from 'next/link';
import { useSession, signIn } from "next-auth/react";
import AccountMenu from './AccountMenu'


const Header = () => {

const { data: session, status } = useSession();
const loading = status === "loading";
if (loading) return null;


  return (
    <div className='container mx-auto px-10 mb-8'>
        <div className='border-b w-full inline-block border-blue-400 py-8'>
            <div className='md:float-left block'>
                <Link href="/">
                    <span className='cursor-pointer font-bold text-4xl text-white'>
                        Encompass Training
                    </span>
                </Link>
            </div>
            <div className='float-right block invisible md:visible'>
                {session && <AccountMenu />} 
            </div>
        
        </div>
    </div>
  )
}

export default Header