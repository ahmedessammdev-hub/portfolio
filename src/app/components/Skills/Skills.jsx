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

export default function Skills() {
  const [skillCategories, setSkillCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('/api/skills');
        if (response.ok) {
          const result = await response.json();
          setSkillCategories(result);
        }
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkills();
  }, []);

  if (isLoading) {
    return (
      <section id="skills" className={`py-24 bg-black text-white ${bebasNeue.className}`}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D3E97A] mx-auto mb-4"></div>
          <p className="text-[#C7C7C7]">Loading skills...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className={`py-24 bg-black text-white ${bebasNeue.className}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl mb-4">
            <span className="text-[#D3E97A]">Skills</span>
          </h2>
          <p className={`text-[#C7C7C7] text-lg md:text-xl max-w-2xl mx-auto ${manrope.className}`}>
            Technologies and tools I work with to create amazing experiences
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {skillCategories.length === 0 ? (
            <div className="col-span-2 text-center text-[#C7C7C7] py-12">
              <p>No skills yet.</p>
            </div>
          ) : (
            skillCategories.map((category) => (
            <div
              key={category.id}
              className="bg-[#111111] rounded-xl p-6 md:p-8 border border-[#484848] hover:border-[#D3E97A] transition-colors duration-300"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl">{category.icon}</span>
                <h3 className={`text-2xl md:text-3xl text-[#D3E97A] ${bebasNeue.className}`}>
                  {category.category}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill, index) => (
                  <div key={index} className="skill-item">
                    {/* Skill Name and Level */}
                    <div className="flex justify-between items-center mb-2">
                      <span className={`text-white ${manrope.className} font-medium`}>
                        {skill.name}
                      </span>
                      <span className={`text-[#D3E97A] text-sm ${manrope.className}`}>
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-[#222222] rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-[#D3E97A] to-[#B8D147] h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            ))
          )}
        </div>

      

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className={`text-[#C7C7C7] text-lg mb-6 ${manrope.className}`}>
            Ready to bring your ideas to life?
          </p>
          <a
            href="#contact"
            className="bg-[#D3E97A] text-black px-8 py-3 rounded-2xl hover:bg-white transition duration-200 font-medium inline-block"
          >
            Start a Project
          </a>
        </div>
      </div>
    </section>
  );
}