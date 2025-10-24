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

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch('/api/experience');
        if (response.ok) {
          const result = await response.json();
          setExperiences(result);
        }
      } catch (error) {
        console.error('Error fetching experiences:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  if (isLoading) {
    return (
      <section id="experience" className={`py-24 bg-black text-white ${bebasNeue.className}`}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D3E97A] mx-auto mb-4"></div>
          <p className="text-[#C7C7C7]">Loading experiences...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className={`py-24 bg-black text-white ${bebasNeue.className}`}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl mb-4">
            <span className="text-[#D3E97A]">Experience</span>
          </h2>
          <p className={`text-[#C7C7C7] text-lg md:text-xl max-w-2xl mx-auto ${manrope.className}`}>
            My professional journey in frontend development
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-12">
          {experiences.length === 0 ? (
            <div className="text-center text-[#C7C7C7] py-12">
              <p>No experiences yet.</p>
            </div>
          ) : (
            experiences.map((exp, index) => (
            <div key={exp.id} className="relative">
              {/* Timeline Line */}
              {index !== experiences.length - 1 && (
                <div className="absolute left-6 top-16 w-0.5 h-32 bg-[#484848] hidden md:block"></div>
              )}
              
              {/* Timeline Dot */}
              <div className="absolute left-4 top-6 w-4 h-4 bg-[#D3E97A] rounded-full hidden md:block"></div>

              {/* Experience Card */}
              <div className="md:ml-16 bg-[#111111] rounded-xl p-6 border border-[#484848] hover:border-[#D3E97A] transition-colors duration-300">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className={`text-2xl md:text-3xl text-white mb-2 ${bebasNeue.className}`}>
                      {exp.position}
                    </h3>
                    <p className={`text-[#D3E97A] text-lg mb-1 ${manrope.className} font-semibold`}>
                      {exp.company}
                    </p>
                    <p className={`text-[#C7C7C7] text-sm ${manrope.className}`}>
                      {exp.location}
                    </p>
                  </div>
                  <span className={`text-[#D3E97A] bg-[#222222] px-3 py-1 rounded-full text-sm ${manrope.className} mt-2 md:mt-0 inline-block`}>
                    {exp.duration}
                  </span>
                </div>

                <p className={`text-[#C7C7C7] text-base md:text-lg mb-4 ${manrope.className} leading-relaxed`}>
                  {exp.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {exp.technologies?.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className={`bg-[#222222] text-[#D3E97A] px-3 py-1 rounded-full text-xs ${manrope.className}`}
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}