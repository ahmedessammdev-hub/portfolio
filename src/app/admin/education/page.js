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

export default function AdminEducation() {
  const [education, setEducation] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEdu, setEditingEdu] = useState(null);
  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    duration: '',
    location: '',
    description: '',
    gpa: '',
    type: 'degree',
    achievements: '',
    order: 0,
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadEducation();
  }, []);

  const loadEducation = async () => {
    try {
      const response = await fetch('/api/education');
      if (response.ok) {
        const data = await response.json();
        setEducation(data);
      }
    } catch (error) {
      console.error('Error loading education:', error);
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
      const achievements = formData.achievements
        .split('\n')
        .map(a => a.trim())
        .filter(a => a);

      const eduData = {
        ...formData,
        achievements,
        gpa: formData.gpa || null,
        order: parseInt(formData.order) || 0,
      };

      const url = editingEdu ? `/api/education/${editingEdu.id}` : '/api/education';
      const method = editingEdu ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eduData),
      });

      if (response.ok) {
        setMessage(editingEdu ? 'Education updated successfully!' : 'Education created successfully!');
        setTimeout(() => setMessage(''), 3000);
        setShowForm(false);
        setEditingEdu(null);
        resetForm();
        loadEducation();
      } else {
        const error = await response.json();
        console.error('API Error:', error);
        setMessage(`Error: ${error.error}${error.details ? ' - ' + error.details : ''}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      setMessage('Network error. Please try again. ' + error.message);
    }
  };

  const handleEdit = (edu) => {
    setEditingEdu(edu);
    setFormData({
      degree: edu.degree,
      institution: edu.institution,
      duration: edu.duration,
      location: edu.location,
      description: edu.description || '',
      gpa: edu.gpa || '',
      type: edu.type,
      achievements: edu.achievements?.map(a => a.achievement).join('\n') || '',
      order: edu.order,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this education entry?')) return;

    try {
      const response = await fetch(`/api/education/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('Education deleted successfully!');
        setTimeout(() => setMessage(''), 3000);
        loadEducation();
      }
    } catch (error) {
      setMessage('Error deleting education.');
    }
  };

  const resetForm = () => {
    setFormData({
      degree: '',
      institution: '',
      duration: '',
      location: '',
      description: '',
      gpa: '',
      type: 'degree',
      achievements: '',
      order: 0,
    });
  };

  const getTypeBadgeColor = (type) => {
    switch (type) {
      case 'degree':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'certification':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'online':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen bg-black text-white flex items-center justify-center ${manrope.className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D3E97A] mx-auto mb-4"></div>
          <p className="text-[#C7C7C7]">Loading education...</p>
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
              Education Management
            </h1>
          </div>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingEdu(null);
              resetForm();
            }}
            className="bg-[#D3E97A] text-black px-4 py-2 rounded-lg hover:bg-white transition duration-300"
          >
            + Add New Education
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
                {editingEdu ? 'Edit Education' : 'Add New Education'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="degree" className="block text-[#C7C7C7] mb-2 text-sm font-medium">
                      Degree/Title *
                    </label>
                    <input
                      type="text"
                      id="degree"
                      name="degree"
                      value={formData.degree}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#222222] border border-[#484848] rounded-lg px-4 py-3 text-white focus:border-[#D3E97A] focus:outline-none transition-colors"
                      placeholder="Bachelor of Computer Science"
                    />
                  </div>

                  <div>
                    <label htmlFor="institution" className="block text-[#C7C7C7] mb-2 text-sm font-medium">
                      Institution *
                    </label>
                    <input
                      type="text"
                      id="institution"
                      name="institution"
                      value={formData.institution}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#222222] border border-[#484848] rounded-lg px-4 py-3 text-white focus:border-[#D3E97A] focus:outline-none transition-colors"
                      placeholder="University of Technology"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="duration" className="block text-[#C7C7C7] mb-2 text-sm font-medium">
                      Duration
                    </label>
                    <input
                      type="text"
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className="w-full bg-[#222222] border border-[#484848] rounded-lg px-4 py-3 text-white focus:border-[#D3E97A] focus:outline-none transition-colors"
                      placeholder="2018 - 2022"
                    />
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-[#C7C7C7] mb-2 text-sm font-medium">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full bg-[#222222] border border-[#484848] rounded-lg px-4 py-3 text-white focus:border-[#D3E97A] focus:outline-none transition-colors"
                      placeholder="Sydney, Australia"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="type" className="block text-[#C7C7C7] mb-2 text-sm font-medium">
                      Type
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full bg-[#222222] border border-[#484848] rounded-lg px-4 py-3 text-white focus:border-[#D3E97A] focus:outline-none transition-colors"
                    >
                      <option value="degree">Degree</option>
                      <option value="certification">Certification</option>
                      <option value="online">Online Course</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="gpa" className="block text-[#C7C7C7] mb-2 text-sm font-medium">
                      GPA (optional)
                    </label>
                    <input
                      type="text"
                      id="gpa"
                      name="gpa"
                      value={formData.gpa}
                      onChange={handleChange}
                      className="w-full bg-[#222222] border border-[#484848] rounded-lg px-4 py-3 text-white focus:border-[#D3E97A] focus:outline-none transition-colors"
                      placeholder="3.8/4.0"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-[#C7C7C7] mb-2 text-sm font-medium">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full bg-[#222222] border border-[#484848] rounded-lg px-4 py-3 text-white focus:border-[#D3E97A] focus:outline-none transition-colors resize-none"
                    placeholder="Brief description..."
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="achievements" className="block text-[#C7C7C7] mb-2 text-sm font-medium">
                    Achievements (one per line)
                  </label>
                  <textarea
                    id="achievements"
                    name="achievements"
                    value={formData.achievements}
                    onChange={handleChange}
                    rows="4"
                    className="w-full bg-[#222222] border border-[#484848] rounded-lg px-4 py-3 text-white focus:border-[#D3E97A] focus:outline-none transition-colors resize-none"
                    placeholder="Dean's List all semesters&#10;Published research paper&#10;Led final year project"
                  ></textarea>
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
                    {editingEdu ? 'Update Education' : 'Create Education'}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingEdu(null);
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

        {/* Education List */}
        <div className="space-y-6">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="bg-[#111111] rounded-xl p-6 border border-[#484848] hover:border-[#D3E97A] transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className={`text-2xl font-bold text-white ${bebasNeue.className}`}>
                      {edu.degree}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs border ${getTypeBadgeColor(edu.type)}`}>
                      {edu.type}
                    </span>
                  </div>
                  <p className="text-[#D3E97A] text-lg font-semibold">
                    {edu.institution}
                  </p>
                  <p className="text-[#C7C7C7] text-sm">
                    {edu.duration} {edu.location && `• ${edu.location}`}
                  </p>
                  {edu.gpa && (
                    <p className="text-[#D3E97A] text-sm mt-1">
                      GPA: {edu.gpa}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(edu)}
                    className="bg-[#D3E97A] text-black px-4 py-2 rounded-lg hover:bg-white transition text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(edu.id)}
                    className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg border border-red-500/30 hover:bg-red-500/30 transition text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {edu.description && (
                <p className="text-[#C7C7C7] mb-4">
                  {edu.description}
                </p>
              )}

              {edu.achievements && edu.achievements.length > 0 && (
                <ul className="space-y-2">
                  {edu.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start gap-2 text-[#C7C7C7]">
                      <span className="text-[#D3E97A] mt-1">✓</span>
                      <span>{achievement.achievement}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {education.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#C7C7C7] text-lg mb-4">No education entries yet</p>
            <button
              onClick={() => {
                setShowForm(true);
                setEditingEdu(null);
                resetForm();
              }}
              className="bg-[#D3E97A] text-black px-6 py-3 rounded-lg hover:bg-white transition duration-300"
            >
              Add Your First Education
            </button>
          </div>
        )}
      </div>
    </div>
  );
}