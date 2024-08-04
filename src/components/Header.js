// components/Header.js
"use client"

import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const handleLinkClick = () => {
    setShowMenu(false); // Close the menu
  };

  return (
    <header >
      <div className="absolute top-0 w-full z-50 py-1 px-4 max-w-[1280px] container mx-auto flex items-center justify-between left-1/2 transform -translate-x-1/2 text-green-700" >
        <Link href="/">
          <h1 className=" text-2xl font-bold">PROPrompter</h1>
        </Link>

        <div className="sm:hidden">
          <button onClick={toggleMenu} className=" focus:outline-none">
            {showMenu ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
        </div>

        <nav className="hidden sm:flex sm:items-center sm:space-x-6  " >
          <ul className="sm:flex sm:items-center sm:space-x-6 ">
            <li>
              <Link className='hover:border-b-2 duration-75 hover:pb-0.5 hover:border-green-700 hover:font-bold ' href="/prompts/galary" onClick={handleLinkClick}>Gallery</Link>
            </li>
            <li>
              <Link className='hover:border-b-2 duration-75 hover:pb-0.5 hover:border-green-700 hover:font-bold ' href="/prompts/myprompts" onClick={handleLinkClick}>My Prompts</Link>
            </li>
            <li>
              <Link className='hover:border-b-2 duration-75 hover:pb-0.5 hover:border-green-700 hover:font-bold ' href="/chat" onClick={handleLinkClick}>Chat Now</Link>
            </li>
            <li>
              <Link className='hover:border-b-2 duration-75 hover:pb-0.5 hover:border-green-700 hover:font-bold ' href="/auth/login" onClick={handleLinkClick}>Login</Link>
            </li>
          </ul>
        </nav>

      </div>
      {
        showMenu &&
        <nav className="absolute top-0 w-full sm:flex sm:items-center sm:space-x-6   z-40 p-4">
          <ul className="sm:flex sm:items-center sm:space-x-6 space-y-3  mt-10">
            <li>
              <Link className='hover:border-b-2 duration-75 hover:pb-0.5 hover:border-green-700 hover:font-bold ' href="/prompts/galary" onClick={handleLinkClick}>Gallery</Link>
            </li>
            <li>
              <Link className='hover:border-b-2 duration-75 hover:pb-0.5 hover:border-green-700 hover:font-bold ' href="/prompts/myprompts" onClick={handleLinkClick}>My Prompts</Link>
            </li>
            <li>
              <Link className='hover:border-b-2 duration-75 hover:pb-0.5 hover:border-green-700 hover:font-bold ' href="/chat" onClick={handleLinkClick}>Chat Now</Link>
            </li>
            <li>
              <Link className='hover:border-b-2 duration-75 hover:pb-0.5 hover:border-green-700 hover:font-bold ' href="/auth/login" onClick={handleLinkClick}>Login</Link>
            </li>
          </ul>
        </nav>
      }
    </header>
  );
}