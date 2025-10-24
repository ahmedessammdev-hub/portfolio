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

export default function AdminExperience() {
  const [experiences, setExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingExp, setEditingExp] = useState(null);
  const [formData, setFormData] = useState({
    position: '',
    company: '',
    duration: '',
    location: '',
    description: '',
    technologies: '',
    order: 0,
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      const response = await fetch('/api/experience');
      if (response.ok) {
        const data = await response.json();
        setExperiences(data);
      }
    } catch (error) {
      console.error('Error loading experiences:', error);
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
    setMessage('');

    try {
      const technologies = formData.technologies.split(',').map(t => t.trim()).filter(t => t);
      const expData = {
        ...formData,
        technologies,
        order: parseInt(formData.order) || 0,
      };

      const url = editingExp ? `/api/experience/${editingExp.id}` : '/api/experience';
      const method = editingExp ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expData),
      });

      if (response.ok) {
        setMessage(editingExp ? 'Experience updated successfully!' : 'Experience created successfully!');
        setTimeout(() => setMessage(''), 3000);
        setShowForm(false);
        setEditingExp(null);
        resetForm();
        loadExperiences();
      } else {
        const error = await response.json();
        setMessage(`Error: ${error.error}`);
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    }
  };

  const handleEdit = (exp) => {
    setEditingExp(exp);
    setFormData({
      position: exp.position,
      company: exp.company,
      duration: exp.duration,
      location: exp.location,
      description: exp.description,
      technologies: exp.technologies?.map(t => t.name).join(', ') || '',
      order: exp.order,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;

    try {
      const response = await fetch(`/api/experience/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('Experience deleted successfully!');
        setTimeout(() => setMessage(''), 3000);
        loadExperiences();
      }
    } catch (error) {
      setMessage('Error deleting experience.');
    }
  };

  const resetForm = () => {
    setFormData({
      position: '',
      company: '',
      duration: '',
      location: '',
      description: '',
      technologies: '',
      order: 0,
    });
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen bg-black text-white flex items-center justify-center ${manrope.className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D3E97A] mx-auto mb-4"></div>
          <p className="text-[#C7C7C7]">Loading experiences...</p>
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
              Experience Management
            </h1>
          </div>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingExp(null);
              resetForm();
            }}
            className="bg-[#D3E97A] text-black px-4 py-2 rounded-lg hover:bg-white transition duration-300"
          >
            + Add New Experience
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {message && (
          <div className={`rounded-lg p-4 mb-6 ${
            message.includes('Error') 
              ? 'bg-red-500/20 border border-red-500/30 text-red-400' 
              : 'bg-green-500/20 border border-green-500/30 text-green-400'
          }`}>
            <p className="text-sm">{message}</p>
          </div>
        )}

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-[#111111] rounded-xl p-8 border border-[#484848] max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className={`text-3xl font-bold text-[#D3E97A] mb-6 ${bebasNeue.className}`}>
                {editingExp ? 'Edit Experience' : 'Add New Experience'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="position" className="block text-[#C7C7C7] mb-2 text-sm font-medium">
                      Position *
                    </label>
                    <input
                      type="text"
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#222222] border border-[#484848] rounded-lg px-4 py-3 text-white focus:border-[#D3E97A] focus:outline-none transition-colors"
                      placeholder="Senior Frontend Developer"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-[#C7C7C7] mb-2 text-sm font-medium">
                      Company *
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#222222] border border-[#484848] rounded-lg px-4 py-3 text-white focus:border-[#D3E97A] focus:outline-none transition-colors"
                      placeholder="Tech Solutions Inc."
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="duration" className="block text-[#C7C7C7] mb-2 text-sm font-medium">
                      Duration *
                    </label>
                    <input
                      type="text"
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#222222] border border-[#484848] rounded-lg px-4 py-3 text-white focus:border-[#D3E97A] focus:outline-none transition-colors"
                      placeholder="2022 - Present"
                    />
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-[#C7C7C7] mb-2 text-sm font-medium">
                      Location *
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#222222] border border-[#484848] rounded-lg px-4 py-3 text-white focus:border-[#D3E97A] focus:outline-none transition-colors"
                      placeholder="Sydney, Australia"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-[#C7C7C7] mb-2 text-sm font-medium">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full bg-[#222222] border border-[#484848] rounded-lg px-4 py-3 text-white focus:border-[#D3E97A] focus:outline-none transition-colors resize-none"
                    placeholder="Job description and responsibilities..."
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="technologies" className="block text-[#C7C7C7] mb-2 text-sm font-medium">
                    Technologies (comma-separated)
                  </label>
                  <input
                    type="text"
                    id="technologies"
                    name="technologies"
                    value={formData.technologies}
                    onChange={handleChange}
                    className="w-full bg-[#222222] border border-[#484848] rounded-lg px-4 py-3 text-white focus:border-[#D3E97A] focus:outline-none transition-colors"
                    placeholder="React, Next.js, TypeScript"
                  />
                </div>

                <div>
                  <label htmlFor="order" className="block text-[#C7C7C7] mb-2 text-sm font-medium">
                    Display Order
                  </label>
                  <input
                    type="number"
                    id="order"
                    name="order"
                    value={formData.order}
                    onChange={handleChange}
                    className="w-full bg-[#222222] border border-[#484848] rounded-lg px-4 py-3 text-white focus:border-[#D3E97A] focus:outline-none transition-colors"
                    placeholder="0"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="bg-[#D3E97A] text-black px-6 py-3 rounded-lg font-medium hover:bg-white transition duration-300"
                  >
                    {editingExp ? 'Update Experience' : 'Create Experience'}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingExp(null);
                      resetForm();
                    }}
                    className="bg-[#222222] text-white px-6 py-3 rounded-lg hover:bg-[#333333] transition duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Experiences List */}
        <div className="space-y-6">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-[#111111] rounded-xl p-6 border border-[#484848] hover:border-[#D3E97A] transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className={`text-2xl font-bold text-white mb-1 ${bebasNeue.className}`}>
                    {exp.position}
                  </h3>
                  <p className="text-[#D3E97A] text-lg font-semibold">
                    {exp.company}
                  </p>
                  <p className="text-[#C7C7C7] text-sm">
                    {exp.duration} • {exp.location}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(exp)}
                    className="bg-[#D3E97A] text-black px-4 py-2 rounded-lg hover:bg-white transition text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(exp.id)}
                    className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg border border-red-500/30 hover:bg-red-500/30 transition text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <p className="text-[#C7C7C7] mb-4">
                {exp.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {exp.technologies?.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-[#222222] text-[#D3E97A] px-3 py-1 rounded-full text-xs"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {experiences.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#C7C7C7] text-lg mb-4">No experiences yet</p>
            <button
              onClick={() => {
                setShowForm(true);
                setEditingExp(null);
                resetForm();
              }}
              className="bg-[#D3E97A] text-black px-6 py-3 rounded-lg hover:bg-white transition duration-300"
            >
              Add Your First Experience
            </button>
          </div>
        )}
      </div>
    </div>
  );
}