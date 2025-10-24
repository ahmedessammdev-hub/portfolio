import React from "react";
import { Bebas_Neue, Manrope } from "next/font/google";
import Image from "next/image";
import Github from "../icons/Github";
import Linkedin from "../icons/Linkedin";


const manrope = Manrope({
    subsets:['latin'],
    weight:['400']
});
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});




export default function HeroContant({ name, bio ,linkedIn,github,cvLink}) {
  return (
    <section
      className={`flex flex-col text-white ${bebasNeue.className} items-center  xl:items-start justify-center gap-5`}>
      <h1 className="text-6xl md:text-8xl font-normal text-center xl:text-left">
        Hi, I’m <br />
        <span className="text-[#D3E97A]">{name}</span>.
      </h1>

      <p
        className={`text-lg ${manrope.className} md:text-xl text-[#C7C7C7] max-w-2xl text-center xl:text-left`}>
        {bio}
      </p>

      <div className="flex gap-6 py-10 justify-center items-center">
        <a
          href="#contact"
          className="bg-[#D3E97A] flex gap-3 justify-around items-baseline px-6 py-2 rounded-2xl hover:bg-white hover:text-[#D3E97A] transition duration-300">
          Contact Me
          <span className="w-[8px] h-[8px] rounded-full  hover:bg-[#D3E97A]  block"></span>
        </a>

        <a
          href={linkedIn}
          className="bg-[#222222] p-2 rounded-full text-white hover:bg-[#D3E97A] transition duration-300">
          <Linkedin color="#D3E97A" hoverColor="white" />
        </a>

        <a
          href={github}
          aria-label="GitHub Profile"
          className="bg-[#222222] p-2 rounded-full hover:bg-[#D3E97A] transition duration-300">
          <Github color="#D3E97A" hoverColor="white" />
        </a>
      </div>
    </section>
  );
}
