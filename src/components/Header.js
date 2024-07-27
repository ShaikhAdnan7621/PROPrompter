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

  // Function to close the menu when a link is clicked
  const handleLinkClick = () => {
    setShowMenu(false); // Close the menu
  };

  return (
    <header className="absolute w-full top-0 z-50 bg-green-700  shadow-md">
      <div className="py-1 px-4 max-w-[1280px] container mx-auto flex items-center justify-between">
        <Link href="/">
          <h1 className="text-white text-2xl font-bold">PROPrompter</h1>
        </Link>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {showMenu ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
        </div>

        <nav className={`md:flex md:items-center md:space-x-6 text-white ${showMenu ? 'block' : 'hidden'}`}>
          <ul className="md:flex md:items-center md:space-x-6 text-white">
            <li>
              <Link href="/prompts/galary" onClick={handleLinkClick}>Gallery</Link>
            </li>
            <li>
              <Link href="/prompts/myprompts" onClick={handleLinkClick}>My Prompts</Link>
            </li>
            <li>
              <Link href="/chat" onClick={handleLinkClick}>Chat Now</Link>
            </li>
            <li>
              <Link href="/auth/login" onClick={handleLinkClick}>Login</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}