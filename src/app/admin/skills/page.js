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

export default function AdminSkills() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingSkill, setEditingSkill] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [categoryData, setCategoryData] = useState({
    category: '',
    icon: '',
    order: 0,
  });
  const [skillData, setSkillData] = useState({
    name: '',
    level: 50,
    order: 0,
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const response = await fetch('/api/skills');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Error loading skills:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryChange = (e) => {
    setCategoryData({
      ...categoryData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSkillChange = (e) => {
    setSkillData({
      ...skillData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const url = editingCategory ? `/api/skills/${editingCategory.id}` : '/api/skills';
      const method = editingCategory ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...categoryData,
          order: parseInt(categoryData.order) || 0,
        }),
      });

      if (response.ok) {
        setMessage(editingCategory ? 'Category updated successfully!' : 'Category created successfully!');
        setTimeout(() => setMessage(''), 3000);
        setShowCategoryForm(false);
        setEditingCategory(null);
        resetCategoryForm();
        loadSkills();
      } else {
        const error = await response.json();
        setMessage(`Error: ${error.error}`);
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    }
  };

  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const url = editingSkill 
        ? `/api/skills/${selectedCategoryId}/skills/${editingSkill.id}` 
        : `/api/skills/${selectedCategoryId}/skills`;
      const method = editingSkill ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...skillData,
          level: parseInt(skillData.level) || 0,
          order: parseInt(skillData.order) || 0,
        }),
      });

      if (response.ok) {
        setMessage(editingSkill ? 'Skill updated successfully!' : 'Skill created successfully!');
        setTimeout(() => setMessage(''), 3000);
        setShowSkillForm(false);
        setEditingSkill(null);
        resetSkillForm();
        loadSkills();
      } else {
        const error = await response.json();
        setMessage(`Error: ${error.error}`);
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    }
  };

  const handleEditCategory = (cat) => {
    setEditingCategory(cat);
    setCategoryData({
      category: cat.category,
      icon: cat.icon || '',
      order: cat.order,
    });
    setShowCategoryForm(true);
  };

  const handleEditSkill = (skill, categoryId) => {
    setEditingSkill(skill);
    setSelectedCategoryId(categoryId);
    setSkillData({
      name: skill.name,
      level: skill.level,
      order: skill.order,
    });
    setShowSkillForm(true);
  };

  const handleDeleteCategory = async (id) => {
    if (!confirm('Are you sure? This will delete all skills in this category.')) return;

    try {
      const response = await fetch(`/api/skills/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('Category deleted successfully!');
        setTimeout(() => setMessage(''), 3000);
        loadSkills();
      }
    } catch (error) {
      setMessage('Error deleting category.');
    }
  };

  const handleDeleteSkill = async (categoryId, skillId) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;

    try {
      const response = await fetch(`/api/skills/${categoryId}/skills/${skillId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('Skill deleted successfully!');
        setTimeout(() => setMessage(''), 3000);
        loadSkills();
      }
    } catch (error) {
      setMessage('Error deleting skill.');
    }
  };

  const resetCategoryForm = () => {
    setCategoryData({
      category: '',
      icon: '',
      order: 0,
    });
  };

  const resetSkillForm = () => {
    setSkillData({
      name: '',
      level: 50,
      order: 0,
    });
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen bg-black text-white flex items-center justify-center ${manrope.className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D3E97A] mx-auto mb-4"></div>
          <p className="text-[#C7C7C7]">Loading skills...</p>
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
              Skills Management
            </h1>
          </div>
          <button
            onClick={() => {
              setShowCategoryForm(true);
              setEditingCategory(null);
              resetCategoryForm();
            }}
            className="bg-[#D3E97A] text-black px-4 py-2 rounded-lg hover:bg-white transition duration-300"
          >
            + Add Category
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

        {/* Category Form Modal */}
        {showCategoryForm && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-[#111111] rounded-xl p-8 border border-[#484848] max-w-md w-full">
              <h2 className={`text-3xl font-bold text-[#D3E97A] mb-6 ${bebasNeue.className}`}>
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h2>

              <form onSubmit={handleCategorySubmit} className="space-y-6">
                <div>
                  <label htmlFor="category" className="block text-[#C7C7C7] mb-2 text-sm font-medium">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={categoryData.category}
                    onChange={handleCategoryChange}
                    required
                    className="w-full bg-[#222222] border border-[#484848] rounded-lg px-4 py-3 text-white focus:border-[#D3E97A] focus:outline-none transition-colors"
                    placeholder="Frontend Development"
                  />
                </div>

                <div>
                  <label htmlFor="icon" className="block text-[#C7C7C7] mb-2 text-sm font-medium">
                    Icon (emoji or text)
                  </label>
                  <input
                    type="text"
                    id="icon"
                    name="icon"
                    value={categoryData.icon}
                    onChange={handleCategoryChange}
                    className="w-full bg-[#222222] border border-[#484848] rounded-lg px-4 py-3 text-white focus:border-[#D3E97A] focus:outline-none transition-colors"
                    placeholder="💻"
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
                    value={categoryData.order}
                    onChange={handleCategoryChange}
                    className="w-full bg-[#222222] border border-[#484848] rounded-lg px-4 py-3 text-white focus:border-[#D3E97A] focus:outline-none transition-colors"
                    placeholder="0"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="bg-[#D3E97A] text-black px-6 py-3 rounded-lg font-medium hover:bg-white transition duration-300"
                  >
                    {editingCategory ? 'Update Category' : 'Create Category'}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => {
                      setShowCategoryForm(false);
                      setEditingCategory(null);
                      resetCategoryForm();
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

        {/* Skill Form Modal */}
        {showSkillForm && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-[#111111] rounded-xl p-8 border border-[#484848] max-w-md w-full">
              <h2 className={`text-3xl font-bold text-[#D3E97A] mb-6 ${bebasNeue.className}`}>
                {editingSkill ? 'Edit Skill' : 'Add New Skill'}
              </h2>

              <form onSubmit={handleSkillSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-[#C7C7C7] mb-2 text-sm font-medium">
                    Skill Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={skillData.name}
                    onChange={handleSkillChange}
                    required
                    className="w-full bg-[#222222] border border-[#484848] rounded-lg px-4 py-3 text-white focus:border-[#D3E97A] focus:outline-none transition-colors"
                    placeholder="React.js"
                  />
                </div>

                <div>
                  <label htmlFor="level" className="block text-[#C7C7C7] mb-2 text-sm font-medium">
                    Level: {skillData.level}%
                  </label>
                  <input
                    type="range"
                    id="level"
                    name="level"
                    min="0"
                    max="100"
                    value={skillData.level}
                    onChange={handleSkillChange}
                    className="w-full h-2 bg-[#222222] rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #D3E97A 0%, #D3E97A ${skillData.level}%, #222222 ${skillData.level}%, #222222 100%)`
                    }}
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
                    value={skillData.order}
                    onChange={handleSkillChange}
                    className="w-full bg-[#222222] border border-[#484848] rounded-lg px-4 py-3 text-white focus:border-[#D3E97A] focus:outline-none transition-colors"
                    placeholder="0"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="bg-[#D3E97A] text-black px-6 py-3 rounded-lg font-medium hover:bg-white transition duration-300"
                  >
                    {editingSkill ? 'Update Skill' : 'Create Skill'}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => {
                      setShowSkillForm(false);
                      setEditingSkill(null);
                      resetSkillForm();
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

        {/* Categories and Skills List */}
        <div className="space-y-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-[#111111] rounded-xl p-6 border border-[#484848]"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  {cat.icon && <span className="text-3xl">{cat.icon}</span>}
                  <h3 className={`text-2xl font-bold text-white ${bebasNeue.className}`}>
                    {cat.category}
                  </h3>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedCategoryId(cat.id);
                      setShowSkillForm(true);
                      setEditingSkill(null);
                      resetSkillForm();
                    }}
                    className="bg-[#D3E97A] text-black px-3 py-1.5 rounded-lg hover:bg-white transition text-sm"
                  >
                    + Add Skill
                  </button>
                  <button
                    onClick={() => handleEditCategory(cat)}
                    className="bg-[#222222] text-white px-3 py-1.5 rounded-lg hover:bg-[#333333] transition text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(cat.id)}
                    className="bg-red-500/20 text-red-400 px-3 py-1.5 rounded-lg border border-red-500/30 hover:bg-red-500/30 transition text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {cat.skills?.map((skill) => (
                  <div key={skill.id} className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <span className="text-white">{skill.name}</span>
                        <span className="text-[#D3E97A]">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-[#222222] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#D3E97A] transition-all duration-300"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditSkill(skill, cat.id)}
                        className="text-[#D3E97A] hover:text-white text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteSkill(cat.id, skill.id)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}

                {(!cat.skills || cat.skills.length === 0) && (
                  <p className="text-[#C7C7C7] text-center py-4">
                    No skills yet. Click &quot;Add Skill&quot; to add one.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#C7C7C7] text-lg mb-4">No skill categories yet</p>
            <button
              onClick={() => {
                setShowCategoryForm(true);
                setEditingCategory(null);
                resetCategoryForm();
              }}
              className="bg-[#D3E97A] text-black px-6 py-3 rounded-lg hover:bg-white transition duration-300"
            >
              Add Your First Category
            </button>
          </div>
        )}
      </div>
    </div>
  );
}