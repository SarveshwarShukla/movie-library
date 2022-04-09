import React from 'react'
import Image from 'next/image'
import logo from '../public/images/logo.svg'
import {getSession, signIn, useSession, signOut } from 'next-auth/client'
import { useRouter } from 'next/router'

const Header = () => {

    const [session] = useSession();
    const router = useRouter();

    return (
        <header className="sticky bg-[#040714] top-0 z-[1000] flex px-10 h-[72px] md:px-12">
            <Image src={logo} width={80} height={80} className="cursor-pointer" 
            onClick={()=> router.push("/")}
            />
            {
                session && (

                    <div className="hidden ml-10 text-white lg:flex items-center space-x-6">
                        <a className="header-link group" onClick={()=> router.push("/")}>Home</a>
                        <a className="header-link group" onClick={()=> router.push("/")}>Shows</a>
                        <a className="header-link group" onClick={()=> router.push("/")}>Movies</a>
                        <a className="header-link group" onClick={()=> router.push("/")}>Originals</a>
                        <a className="header-link group" onClick={()=> router.push("/")}>Watchlist</a>
                        <a className="header-link group" onClick={()=> router.push("/")}>Search</a>
                    </div>
                )
            }
            {!session ? (
                <button className="ml-auto h-10 my-auto uppercase border px-4 py-1.5 rounded font-medium hover:bg-white hover:text-black transition duration-500" onClick={signIn}>Login</button>
            ) : (
                <>
                <img src={session.user.image} alt="" className="ml-auto h-10 w-10 my-auto rounded-full object-cover cursor-pointer" />
                <span className="my-auto px-4 py-1.5 border ml-4 rounded hover:bg-white hover:text-black cursor-pointer transition duration-500" onClick={signOut}>Logout</span>
                </>
                
            )}



        </header>
    )
}

export default Header
