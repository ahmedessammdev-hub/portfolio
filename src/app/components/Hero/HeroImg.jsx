import React from 'react'

export default function HeroImg({ heroImg }) {
  return (
    <>
      {/* <div className="md:bg-gradient-to-b md:from-black md:via-gray-800 md:to-gray-600 rounded-xl border-0"> */}
        <img className="w-[400px] md:w-[450px]" src={heroImg} alt="Profile" />
      {/* </div> */}
    </>
  );
}
