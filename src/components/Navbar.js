"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const links = [
    {
      name: "Request Service",
      href: "/request-service",
    },

    {
      name: "Dashboard",
      href: "/dashboard",
    },

    {
      name: "Test Tools",
      href: "/test-tools",
    },
  ];

  return (
    <nav className="bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo Section */}
        <div>
          <h1 className="text-2xl font-bold">
            Mini Lead System
          </h1>

          <p className="text-sm text-gray-400">
            Full Stack Internship Project
          </p>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-10">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition font-medium text-sm xl:text-base ${
                pathname === link.href
                  ? "text-yellow-400"
                  : "hover:text-gray-300"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Button */}
        <button
          className="lg:hidden border border-gray-500 px-3 py-1 rounded"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden px-6 pb-4 flex flex-col gap-3 bg-black">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() =>
                setMenuOpen(false)
              }
              className={`transition font-medium text-sm xl:text-base ${
                pathname === link.href
                  ? "text-yellow-400"
                  : "hover:text-gray-300"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}