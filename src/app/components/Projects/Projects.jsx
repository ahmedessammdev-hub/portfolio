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

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (response.ok) {
          const result = await response.json();
          setProjects(result);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  if (isLoading) {
    return (
      <section id="projects" className={`py-24 bg-black text-white ${bebasNeue.className}`}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D3E97A] mx-auto mb-4"></div>
          <p className={`text-[#C7C7C7] ${manrope.className}`}>Loading projects...</p>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section id="projects" className={`py-24 bg-black text-white ${bebasNeue.className}`}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl mb-4">
            <span className="text-[#D3E97A]">Projects</span>
          </h2>
          <p className={`text-[#C7C7C7] text-lg ${manrope.className}`}>
            No projects available yet. Check back soon!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className={`py-24 bg-black text-white ${bebasNeue.className}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl mb-4">
            <span className="text-[#D3E97A]">Projects</span>
          </h2>
          <p
            className={`text-[#C7C7C7] text-lg md:text-xl max-w-2xl mx-auto ${manrope.className}`}>
            A showcase of my recent work and creative solutions
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-20">
          <h3
            className={`text-3xl md:text-4xl text-[#D3E97A] mb-10 ${bebasNeue.className}`}>
            Featured Projects
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-[#111111] rounded-xl overflow-hidden border border-[#484848] hover:border-[#D3E97A] transition-colors duration-300 group">
              

                {/* Project Image */}
                <div className="relative h-48 md:h-56 overflow-hidden bg-[#222222]">
                  {project.image ? (
                    <>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="absolute z-20 inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300"></div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <span
                        className={`text-[#D3E97A] text-4xl ${bebasNeue.className}`}>
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h4
                    className={`text-2xl md:text-3xl text-white mb-3 ${bebasNeue.className}`}>
                    {project.title}
                  </h4>
                  <p
                    className={`text-[#C7C7C7] text-base md:text-lg mb-4 ${manrope.className} leading-relaxed`}>
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies?.map((tech, index) => (
                      <span
                        key={index}
                        className={`bg-[#222222] text-[#D3E97A] px-3 py-1 rounded-full text-xs ${manrope.className}`}>
                        {tech.name}
                      </span>
                    ))}
                  </div>

                  {/* Project Links */}
                  <div className="flex gap-4">
                    <a
                      href={project.liveLink}
                      className="bg-[#D3E97A] text-black px-4 py-2 rounded-lg hover:bg-white transition duration-200 font-medium">
                      Live Demo
                    </a>
                    <a
                      href={project.githubLink}
                      className="bg-[#222222] text-white px-4 py-2 rounded-lg hover:bg-[#D3E97A] hover:text-black transition duration-200">
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div>
            <h3
              className={`text-3xl md:text-4xl text-[#D3E97A] mb-10 ${bebasNeue.className}`}>
              Other Projects
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-[#111111] rounded-xl overflow-hidden border border-[#484848] hover:border-[#D3E97A] transition-colors duration-300 group">
                  {/* Project Image */}
                  {project.image && (
                    <div className="relative h-40 overflow-hidden bg-[#222222]">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300"></div>
                    </div>
                  )}

                  <div className="p-6">
                    <h4
                      className={`text-xl md:text-2xl text-white mb-3 ${bebasNeue.className}`}>
                      {project.title}
                    </h4>
                    <p
                      className={`text-[#C7C7C7] text-sm md:text-base mb-4 ${manrope.className} leading-relaxed`}>
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies?.slice(0, 3).map((tech, index) => (
                        <span
                          key={index}
                          className={`bg-[#222222] text-[#D3E97A] px-2 py-1 rounded-full text-xs ${manrope.className}`}>
                          {tech.name}
                        </span>
                      ))}
                      {project.technologies &&
                        project.technologies.length > 3 && (
                          <span
                            className={`text-[#C7C7C7] text-xs ${manrope.className}`}>
                            +{project.technologies.length - 3} more
                          </span>
                        )}
                    </div>

                    {/* Project Links */}
                    <div className="flex gap-3">
                      <a
                        href={project.liveLink}
                        className="bg-[#D3E97A] text-black px-3 py-1 rounded-md hover:bg-white transition duration-200 text-sm font-medium">
                        Live
                      </a>
                      <a
                        href={project.githubLink}
                        className="bg-[#222222] text-white px-3 py-1 rounded-md hover:bg-[#D3E97A] hover:text-black transition duration-200 text-sm">
                        Code
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className={`text-[#C7C7C7] text-lg mb-6 ${manrope.className}`}>
            Interested in working together?
          </p>
          <a
            href="#contact"
            className="bg-[#D3E97A] text-black px-8 py-3 rounded-2xl hover:bg-white transition duration-200 font-medium inline-block">
            Let's Talk
          </a>
        </div>
      </div>
    </section>
  );
}