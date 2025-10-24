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

const data = {
  title: "Education",
  subtitle: "My academic journey and continuous learning path",
  education: [
    {
      id: 1,
      degree: "Bachelor of Computer Science",
      institution: "University of Technology Sydney",
      duration: "2015 - 2019",
      location: "Sydney, Australia",
      description: "Focused on software engineering, web development, and computer systems. Graduated with honors and completed a thesis on modern web application architectures.",
      achievements: [
        "Dean's List for Academic Excellence",
        "Best Final Year Project Award",
        "Member of Computer Science Society"
      ],
      gpa: "3.8/4.0",
      type: "degree"
    },
    {
      id: 2,
      degree: "Full Stack Web Development Bootcamp",
      institution: "General Assembly",
      duration: "2019",
      location: "Sydney, Australia",
      description: "Intensive 12-week program covering modern web development technologies including React, Node.js, and database management.",
      achievements: [
        "Top 10% of graduating class",
        "Built 5 full-stack applications",
        "Mentored junior students"
      ],
      type: "bootcamp"
    },
    {
      id: 3,
      degree: "React Developer Certification",
      institution: "Meta (Facebook)",
      duration: "2021",
      location: "Online",
      description: "Advanced React concepts including hooks, context, performance optimization, and modern React patterns.",
      achievements: [
        "Completed with 98% score",
        "Advanced React Patterns",
        "Performance Optimization Specialist"
      ],
      type: "certification"
    },
    {
      id: 4,
      degree: "AWS Certified Developer",
      institution: "Amazon Web Services",
      duration: "2022",
      location: "Online",
      description: "Cloud development certification covering AWS services, serverless architecture, and cloud deployment strategies.",
      achievements: [
        "Associate Level Certification",
        "Serverless Architecture Specialist",
        "Valid until 2025"
      ],
      type: "certification"
    }
  ],
  onlineCourses: [
    "Advanced JavaScript Concepts - Udemy",
    "TypeScript Masterclass - Pluralsight",
    "UI/UX Design Fundamentals - Coursera",
    "GraphQL with React - Frontend Masters",
    "Docker & Kubernetes - Linux Academy",
    "Next.js & React - The Complete Guide"
  ]
};

export default function Education() {
  const [education, setEducation] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await fetch('/api/education');
        if (response.ok) {
          const result = await response.json();
          setEducation(result);
        }
      } catch (error) {
        console.error('Error fetching education:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEducation();
  }, []);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'degree':
        return '🎓';
      case 'bootcamp':
        return '💻';
      case 'certification':
        return '🏆';
      default:
        return '📚';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'degree':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'bootcamp':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'certification':
        return 'bg-[#D3E97A]/20 text-[#D3E97A] border-[#D3E97A]/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  if (isLoading) {
    return (
      <section id="education" className={`py-24 bg-black text-white ${bebasNeue.className}`}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D3E97A] mx-auto mb-4"></div>
          <p className="text-[#C7C7C7]">Loading education...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="education" className={`py-24 bg-black text-white ${bebasNeue.className}`}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl mb-4">
            <span className="text-[#D3E97A]">Education</span>
          </h2>
          <p className={`text-[#C7C7C7] text-lg md:text-xl max-w-2xl mx-auto ${manrope.className}`}>
            My academic journey and continuous learning path
          </p>
        </div>

        {/* Education Timeline */}
        <div className="space-y-10">
          {education.length === 0 ? (
            <div className="text-center text-[#C7C7C7] py-12">
              <p>No education entries yet.</p>
            </div>
          ) : (
            education.map((edu, index) => (
            <div key={edu.id} className="relative">
              {/* Timeline Line */}
              {index !== education.length - 1 && (
                <div className="absolute left-6 top-20 w-0.5 h-40 bg-[#484848] hidden md:block"></div>
              )}
              
              {/* Timeline Dot */}
              <div className="absolute left-4 top-6 w-4 h-4 bg-[#D3E97A] rounded-full hidden md:block"></div>

              {/* Education Card */}
              <div className="md:ml-16 bg-[#111111] rounded-xl p-6 border border-[#484848] hover:border-[#D3E97A] transition-colors duration-300">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                  <div className="flex-1">
                    {/* Type Badge */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{getTypeIcon(edu.type)}</span>
                      <span className={`px-3 py-1 rounded-full text-xs border ${getTypeColor(edu.type)} ${manrope.className} capitalize`}>
                        {edu.type}
                      </span>
                    </div>

                    <h3 className={`text-2xl md:text-3xl text-white mb-2 ${bebasNeue.className}`}>
                      {edu.degree}
                    </h3>
                    <p className={`text-[#D3E97A] text-lg mb-1 ${manrope.className} font-semibold`}>
                      {edu.institution}
                    </p>
                    <p className={`text-[#C7C7C7] text-sm ${manrope.className} mb-2`}>
                      {edu.location}
                    </p>
                    {edu.gpa && (
                      <p className={`text-[#D3E97A] text-sm ${manrope.className} font-medium`}>
                        GPA: {edu.gpa}
                      </p>
                    )}
                  </div>
                  
                  <span className={`text-[#D3E97A] bg-[#222222] px-3 py-1 rounded-full text-sm ${manrope.className} mt-2 lg:mt-0 inline-block`}>
                    {edu.duration}
                  </span>
                </div>

                <p className={`text-[#C7C7C7] text-base md:text-lg mb-4 ${manrope.className} leading-relaxed`}>
                  {edu.description}
                </p>

                {/* Achievements */}
                {edu.achievements && edu.achievements.length > 0 && (
                    <div>
                      <h4 className={`text-[#D3E97A] text-lg mb-3 ${bebasNeue.className}`}>
                        Key Achievements
                      </h4>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {edu.achievements.map((achievement, achievementIndex) => (
                          <div
                            key={achievementIndex}
                            className={`bg-[#222222] text-[#C7C7C7] px-3 py-2 rounded-lg text-sm ${manrope.className} flex items-center gap-2`}
                          >
                            <span className="text-[#D3E97A]">•</span>
                            {achievement.achievement}
                          </div>
                        ))}
                      </div>
                    </div>
                )}
              </div>
            </div>
            ))
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className={`text-[#C7C7C7] text-lg mb-6 ${manrope.className}`}>
            Looking for someone committed to growth and excellence?
          </p>
          <a
            href="#contact"
            className="bg-[#D3E97A] text-black px-8 py-3 rounded-2xl hover:bg-white transition duration-200 font-medium inline-block"
          >
            Let's Connect
          </a>
        </div>
      </div>
    </section>
  );
}