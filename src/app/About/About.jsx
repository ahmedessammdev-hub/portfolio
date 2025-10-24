"use client";
import React, { useState, useEffect } from "react";
import { Bebas_Neue, Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400"],
});
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

export default function About() {
  const [data, setData] = useState({
    title: "About",
    bio: "",
    description: "",
    profileImg: "/me.png",
    contactLink: "#contact",
    resumeLink: "/me.png",
    ctaText: "Get in touch",
    resumeText: "View Resume"
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch('/api/about');
        if (response.ok) {
          const result = await response.json();
          if (result) {
            setData({
              title: result.title || "About",
              bio: result.bio || "",
              description: result.description || "",
              profileImg: result.profileImg || "/me.png",
              contactLink: result.contactLink || "#contact",
              resumeLink: result.resumeLink || "/me.png",
              ctaText: result.ctaText || "Get in touch",
              resumeText: result.resumeText || "View Resume"
            });
          }
        }
      } catch (error) {
        console.error('Error fetching about data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (isLoading) {
    return (
      <section id="about" className={`py-24 bg-black text-white ${bebasNeue.className}`}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D3E97A] mx-auto mb-4"></div>
          <p className="text-[#C7C7C7]">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="about"
      className={` py-24 bg-black text-white ${bebasNeue.className}`}>
      <div className=" max-w-7xl  mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-8">
        {/* Text Column */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-5xl md:text-6xl mb-4">
            <span className="text-[#D3E97A]">{data.title}</span>
          </h2>

          <p
            className={`text-[#C7C7C7] text-lg md:text-xl max-w-2xl ${manrope.className} mb-6`}>
            {data.bio}
          </p>

          <p
            className={`text-[#C7C7C7] text-base md:text-lg max-w-2xl ${manrope.className} mb-8`}>
            {data.description}
          </p>

          <div className="flex justify-center md:justify-start gap-4">
            <a
              href={data.contactLink}
              className="bg-[#D3E97A] px-6 py-2 rounded-2xl text-black font-medium hover:bg-white transition duration-200">
              {data.ctaText}
            </a>

            <a
              href={data.resumeLink}
              target="_blank"
              rel="noreferrer"
              className="bg-[#222222] px-4 py-2 rounded-2xl text-white hover:bg-[#D3E97A] transition duration-200">
              {data.resumeText}
            </a>
          </div>
        </div>

        {/* Image Column */}
        <div className=" hidden   flex-1 md:flex justify-center md:justify-end">
          <img
            src={data.profileImg}
            alt="Profile"
            className="w-[320px] md:w-[380px] rounded-xl border-0"
          />
        </div>
      </div>
    </section>
  );
}
