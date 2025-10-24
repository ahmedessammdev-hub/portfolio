"use client";
import React, { useState, useEffect } from "react";
import { Manrope } from "next/font/google";
import Link from "next/link";
import Github from "../icons/Github";
import Linkedin from "../icons/Linkedin";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400"],
});

const quickLinks = [
  { name: "Projects", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" }
];

export default function Footer() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    async function fetchFooterData() {
      try {
        const [heroRes, contactRes] = await Promise.all([
          fetch('/api/hero'),
          fetch('/api/contact/info')
        ]);
        
        const hero = await heroRes.json();
        const contact = await contactRes.json();
        
        setData({
          name: hero.name,
          tagline: hero.bio,
          email: contact.email,
          socialLinks: contact.socialLinks,
          location: contact.location
        });
      } catch (error) {
        console.error('Error fetching footer data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchFooterData();
  }, []);

  if (loading || !data) {
    return (
      <footer className="bg-[#111111] text-white border-t border-[#484848]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 text-center">
          <p className={`text-[#C7C7C7] ${manrope.className}`}>Loading...</p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-[#111111] text-white border-t border-[#484848]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className={`text-2xl font-bold mb-2 ${manrope.className}`}>
              {data.name}
            </h3>
            <p className={`text-[#D3E97A] mb-4 ${manrope.className}`}>
              {data.tagline}
            </p>
            <p className={`text-[#C7C7C7] ${manrope.className} leading-relaxed mb-4`}>
              Passionate about creating beautiful, functional, and user-friendly 
              web experiences that make a difference.
            </p>
            <a 
              href={`mailto:${data.email}`}
              className={`text-[#D3E97A] hover:text-white transition-colors ${manrope.className}`}
            >
              {data.email}
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`text-lg font-semibold mb-4 ${manrope.className}`}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className={`text-[#C7C7C7] hover:text-[#D3E97A] transition-colors ${manrope.className}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className={`text-lg font-semibold mb-4 ${manrope.className}`}>
              Connect With Me
            </h4>
            {data.socialLinks && (
              <div className="flex gap-4 mb-6">
                {data.socialLinks.linkedin && (
                  <a
                    href={data.socialLinks.linkedin}
                    className="bg-[#222222] p-3 rounded-full hover:bg-[#D3E97A] transition duration-300"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin color="#D3E97A" hoverColor="white" />
                  </a>
                )}
                {data.socialLinks.github && (
                  <a
                    href={data.socialLinks.github}
                    className="bg-[#222222] p-3 rounded-full hover:bg-[#D3E97A] transition duration-300"
                    aria-label="GitHub Profile"
                  >
                    <Github color="#D3E97A" hoverColor="white" />
                  </a>
                )}
                {data.socialLinks.twitter && (
                  <a
                    href={data.socialLinks.twitter}
                    className="bg-[#222222] p-3 rounded-full hover:bg-[#D3E97A] transition duration-300 flex items-center justify-center"
                    aria-label="Twitter Profile"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-[#D3E97A]">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                )}
              </div>
            )}
            
            <div className={`text-[#C7C7C7] ${manrope.className}`}>
              {data.location && <p className="mb-2">📍 {data.location}</p>}
              <p className="mb-2">💼 Available for freelance work</p>
              <p>⚡ Quick response guaranteed</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#484848] mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className={`text-[#C7C7C7] ${manrope.className} text-sm`}>
            © {currentYear} {data.name}. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link 
              href="#"
              className={`text-[#C7C7C7] hover:text-[#D3E97A] transition-colors text-sm ${manrope.className}`}
            >
              Privacy Policy
            </Link>
            <Link 
              href="#"
              className={`text-[#C7C7C7] hover:text-[#D3E97A] transition-colors text-sm ${manrope.className}`}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}