"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Bebas_Neue, Manrope } from 'next/font/google';

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    experiences: 0,
    skills: 0,
    messages: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // Load basic stats from APIs
      const [projectsRes, experiencesRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/experience'),
      ]);

      const projects = await projectsRes.json();
      const experiences = await experiencesRes.json();

      setStats({
        projects: projects.length || 0,
        experiences: experiences.length || 0,
        skills: 25, // Placeholder
        messages: 12, // Placeholder
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const sections = [
    {
      title: 'Hero Section',
      description: 'Manage main introduction and hero content',
      href: '/admin/hero',
      icon: '🏠',
      color: 'bg-blue-500/20 border-blue-500/30',
    },
    {
      title: 'About Section',
      description: 'Edit about me information and content',
      href: '/admin/about',
      icon: '👨‍💻',
      color: 'bg-green-500/20 border-green-500/30',
    },
    {
      title: 'Experience',
      description: 'Manage work experience and job history',
      href: '/admin/experience',
      icon: '💼',
      color: 'bg-purple-500/20 border-purple-500/30',
    },
    {
      title: 'Projects',
      description: 'Add, edit, and organize portfolio projects',
      href: '/admin/projects',
      icon: '🚀',
      color: 'bg-yellow-500/20 border-yellow-500/30',
    },
    {
      title: 'Skills',
      description: 'Update technical skills and proficiency levels',
      href: '/admin/skills',
      icon: '⚡',
      color: 'bg-red-500/20 border-red-500/30',
    },
    {
      title: 'Education',
      description: 'Manage educational background and certifications',
      href: '/admin/education',
      icon: '🎓',
      color: 'bg-indigo-500/20 border-indigo-500/30',
    },
    {
      title: 'Contact',
      description: 'Update contact information and view messages',
      href: '/admin/contact',
      icon: '📬',
      color: 'bg-pink-500/20 border-pink-500/30',
    },
    {
      title: 'Settings',
      description: 'General settings and configuration',
      href: '/admin/settings',
      icon: '⚙️',
      color: 'bg-gray-500/20 border-gray-500/30',
    },
  ];

  if (isLoading) {
    return (
      <div className={`min-h-screen bg-black text-white flex items-center justify-center ${manrope.className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D3E97A] mx-auto mb-4"></div>
          <p className="text-[#C7C7C7]">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-black text-white ${manrope.className}`}>
      {/* Header */}
      <header className="border-b border-[#484848] bg-[#111111]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className={`text-2xl font-bold text-[#D3E97A] ${bebasNeue.className}`}>
            Portfolio Admin
          </h1>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-[#C7C7C7] hover:text-[#D3E97A] transition-colors"
            >
              View Site
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg border border-red-500/30 hover:bg-red-500/30 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#111111] rounded-xl p-6 border border-[#484848]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#C7C7C7] text-sm">Projects</p>
                <p className="text-2xl font-bold text-white">{stats.projects}</p>
              </div>
              <div className="text-3xl">🚀</div>
            </div>
          </div>
          
          <div className="bg-[#111111] rounded-xl p-6 border border-[#484848]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#C7C7C7] text-sm">Experience</p>
                <p className="text-2xl font-bold text-white">{stats.experiences}</p>
              </div>
              <div className="text-3xl">💼</div>
            </div>
          </div>
          
          <div className="bg-[#111111] rounded-xl p-6 border border-[#484848]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#C7C7C7] text-sm">Skills</p>
                <p className="text-2xl font-bold text-white">{stats.skills}</p>
              </div>
              <div className="text-3xl">⚡</div>
            </div>
          </div>
          
          <div className="bg-[#111111] rounded-xl p-6 border border-[#484848]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#C7C7C7] text-sm">Messages</p>
                <p className="text-2xl font-bold text-white">{stats.messages}</p>
              </div>
              <div className="text-3xl">📬</div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div>
          <h2 className={`text-3xl font-bold text-[#D3E97A] mb-6 ${bebasNeue.className}`}>
            Manage Content
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section, index) => (
              <Link
                key={index}
                href={section.href}
                className={`block bg-[#111111] rounded-xl p-6 border ${section.color} hover:scale-105 transition-transform duration-200`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{section.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {section.title}
                    </h3>
                    <p className="text-[#C7C7C7] text-sm">
                      {section.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}