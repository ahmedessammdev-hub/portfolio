"use client";
import React, { useState, useEffect } from "react";
import HeroImg from "./HeroImg";
import HeroContant from "./HeroContant";

export default function Hero() {
  const [data, setData] = useState({
    name: "Loading...",
    bio: "",
    linkedIn: "",
    github: "",
    cvLink: "",
    heroImg: 'me.png',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch('/api/hero');
        if (response.ok) {
          const result = await response.json();
          if (result) {
            setData({
              name: result.name || "Your Name",
              bio: result.bio || "",
              linkedIn: result.linkedIn || "",
              github: result.github || "",
              cvLink: result.cvLink || "",
              heroImg: result.heroImg || 'me.png',
            });
          }
        }
      } catch (error) {
        console.error('Error fetching hero data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  if (isLoading) {
    return (
      <main className="xl:h-[100vh] flex flex-col-reverse sm:flex-row justify-around items-center gap-10 flex-wrap bg-black py-10 pt-25">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D3E97A] mx-auto mb-4"></div>
          <p className="text-[#C7C7C7]">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className=" xl:h-[100vh] flex    flex-col-reverse sm:flex-row justify-around items-center gap-10  flex-wrap bg-black py-10 pt-25">
      {/* Hero Contant */}
      <HeroContant
        name={data.name}
        bio={data.bio}
        linkedIn={data.linkedIn}
        github={data.github}
        cvLink={data.cvLink}
      />
      <HeroImg heroImg={data.heroImg} />
    </main>
  );
}
