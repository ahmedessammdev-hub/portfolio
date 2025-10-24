"use client";
import React, { useState, useEffect } from 'react';
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

export default function AdminHero() {
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    linkedIn: '',
    github: '',
    cvLink: '',
    heroImg: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadHeroData();
  }, []);

  const loadHeroData = async () => {
    try {
      const response = await fetch('/api/hero');
      if (response.ok) {
        const data = await response.json();
        setFormData({
          name: data.name || '',
          bio: data.bio || '',
          linkedIn: data.linkedIn || '',
          github: data.github || '',
          cvLink: data.cvLink || '',
          heroImg: data.heroImg || '',
        });
      }
    } catch (error) {
      console.error('Error loading hero data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/hero', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Hero section updated successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        const error = await response.json();
        setMessage(`Error: ${error.error}`);
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen bg-black text-white flex items-center justify-center ${manrope.className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D3E97A] mx-auto mb-4"></div>
          <p className="text-[#C7C7C7]">Loading hero data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-black text-white ${manrope.className}`}>
      {/* Header */}
      <header className="border-b border-[#484848] bg-[#111111]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/dashboard"
              className="text-[#C7C7C7] hover:text-[#D3E97A] transition-colors"
            >
              ← Back to Dashboard
            </Link>
            <h1 className={`text-2xl font-bold text-[#D3E97A] ${bebasNeue.className}`}>
              Hero Section
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-[#111111] rounded-xl p-8 border border-[#484848]">
          <h2 className={`text-3xl font-bold text-[#D3E97A] mb-6 ${bebasNeue.className}`}>
            Edit Hero Section
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {message && (
              <div className={`rounded-lg p-4 ${
                message.includes('Error') 
                  ? 'bg-red-500/20 border border-red-500/30 text-red-400' 
                  : 'bg-green-500/20 border border-green-500/30 text-green-400'
              }`}>
                <p className="text-sm">{message}</p>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-[#C7C7C7] mb-2 text-sm font-medium">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#222222] border border-[#484848] rounded-lg px-4 py-3 text-white focus:border-[#D3E97A] focus:outline-none transition-colors"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="heroImg" className="block text-[#C7C7C7] mb-2 text-sm font-medium">
                  Hero Image Path
                </label>
                <input
                  type="text"
                  id="heroImg"
                  name="heroImg"
                  value={formData.heroImg}
                  onChange={handleChange}
                  className="w-full bg-[#222222] border border-[#484848] rounded-lg px-4 py-3 text-white focus:border-[#D3E97A] focus:outline-none transition-colors"
                  placeholder="me.png"
                />
              </div>
            </div>

            <div>
              <label htmlFor="bio" className="block text-[#C7C7C7] mb-2 text-sm font-medium">
                Bio Description *
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                required
                rows="4"
                className="w-full bg-[#222222] border border-[#484848] rounded-lg px-4 py-3 text-white focus:border-[#D3E97A] focus:outline-none transition-colors resize-none"
                placeholder="A brief description about yourself..."
              ></textarea>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="linkedIn" className="block text-[#C7C7C7] mb-2 text-sm font-medium">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  id="linkedIn"
                  name="linkedIn"
                  value={formData.linkedIn}
                  onChange={handleChange}
                  className="w-full bg-[#222222] border border-[#484848] rounded-lg px-4 py-3 text-white focus:border-[#D3E97A] focus:outline-none transition-colors"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div>
                <label htmlFor="github" className="block text-[#C7C7C7] mb-2 text-sm font-medium">
                  GitHub URL
                </label>
                <input
                  type="url"
                  id="github"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  className="w-full bg-[#222222] border border-[#484848] rounded-lg px-4 py-3 text-white focus:border-[#D3E97A] focus:outline-none transition-colors"
                  placeholder="https://github.com/username"
                />
              </div>
            </div>

            <div>
              <label htmlFor="cvLink" className="block text-[#C7C7C7] mb-2 text-sm font-medium">
                CV/Resume Link
              </label>
              <input
                type="text"
                id="cvLink"
                name="cvLink"
                value={formData.cvLink}
                onChange={handleChange}
                className="w-full bg-[#222222] border border-[#484848] rounded-lg px-4 py-3 text-white focus:border-[#D3E97A] focus:outline-none transition-colors"
                placeholder="/resume.pdf or external URL"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isSaving}
                className="bg-[#D3E97A] text-black px-6 py-3 rounded-lg font-medium hover:bg-white transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
              
              <Link
                href="/admin/dashboard"
                className="bg-[#222222] text-white px-6 py-3 rounded-lg hover:bg-[#333333] transition duration-300"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}