"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed w-full flex justify-between items-center px-6 py-3 xl:px-20 xl:py-3 bg-black z-50 ${inter.className}`}>
      {/* Logo */}
      <Link href="/" onClick={closeMenu}>
        <Image
          src="/me.png"
          alt="Site Logo"
          width={40}
          height={40}
          priority
        />
      </Link>

      {/* Desktop Navigation Links */}
      <ul className="hidden md:flex gap-10 text-[#C7C7C7]">
        <li>
          <Link
            href="#projects"
            className="hover:text-[#D3E97A] transition-colors duration-200">
            Projects
          </Link>
        </li>
        <li>
          <Link
            href="#about"
            className="hover:text-[#D3E97A] transition-colors duration-200">
            About
          </Link>
        </li>
        <li>
          <Link
            href="#experience"
            className="hover:text-[#D3E97A] transition-colors duration-200">
            Experience
          </Link>
        </li>
        <li>
          <Link
            href="#skills"
            className="hover:text-[#D3E97A] transition-colors duration-200">
            Skills
          </Link>
        </li>
        <li>
          <Link
            href="#education"
            className="hover:text-[#D3E97A] transition-colors duration-200">
            Education
          </Link>
        </li>
        <li>
          <Link
            href="#contact"
            className="hover:text-[#D3E97A] transition-colors duration-200">
            Contact
          </Link>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden flex flex-col justify-center items-center w-8 h-8 text-[#C7C7C7] hover:text-[#D3E97A] transition-colors duration-200"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
      >
        <span
          className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
            isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
          }`}
        ></span>
        <span
          className={`block h-0.5 w-6 bg-current mt-1 transition-all duration-300 ${
            isMenuOpen ? 'opacity-0' : ''
          }`}
        ></span>
        <span
          className={`block h-0.5 w-6 bg-current mt-1 transition-all duration-300 ${
            isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
          }`}
        ></span>
      </button>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden fixed top-16 left-0 w-full bg-black border-t border-[#484848] transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <ul className="flex flex-col py-4">
          <li>
            <Link
              href="#projects"
              className="block px-6 py-3 text-[#C7C7C7] hover:text-[#D3E97A] hover:bg-[#111111] transition-colors duration-200"
              onClick={closeMenu}
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              href="#about"
              className="block px-6 py-3 text-[#C7C7C7] hover:text-[#D3E97A] hover:bg-[#111111] transition-colors duration-200"
              onClick={closeMenu}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="#experience"
              className="block px-6 py-3 text-[#C7C7C7] hover:text-[#D3E97A] hover:bg-[#111111] transition-colors duration-200"
              onClick={closeMenu}
            >
              Experience
            </Link>
          </li>
          <li>
            <Link
              href="#skills"
              className="block px-6 py-3 text-[#C7C7C7] hover:text-[#D3E97A] hover:bg-[#111111] transition-colors duration-200"
              onClick={closeMenu}
            >
              Skills
            </Link>
          </li>
          <li>
            <Link
              href="#education"
              className="block px-6 py-3 text-[#C7C7C7] hover:text-[#D3E97A] hover:bg-[#111111] transition-colors duration-200"
              onClick={closeMenu}
            >
              Education
            </Link>
          </li>
          <li>
            <Link
              href="#contact"
              className="block px-6 py-3 text-[#C7C7C7] hover:text-[#D3E97A] hover:bg-[#111111] transition-colors duration-200"
              onClick={closeMenu}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-[-1]"
          onClick={closeMenu}
        ></div>
      )}
    </nav>
  );
}
