import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm py-4">
      <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <div className="container mx-auto flex justify-between items-center px-6">
      <Link href="/">
        <img src="/Logo1.png" alt="SoleyEvazyon Logo" className="h-12" />
        </Link>
        <nav className="flex space-x-4">
          <Link href="/destinations" className="text-customBlue hover:text-blue-600 transition duration-300">Destinations</Link>
          <Link href="/specials" className="text-customBlue hover:text-blue-600 transition duration-300">Offres Spéciales</Link>
          <Link href="/about" className="text-customBlue hover:text-blue-600 transition duration-300">A propos de nous</Link>
          <Link href="/contacts" className="text-customBlue hover:text-blue-600 transition duration-300">Contacts</Link>
        </nav>
      </div>
    </header>
  );
}