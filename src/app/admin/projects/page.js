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

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    liveLink: '',
    githubLink: '',
    featured: false,
    technologies: '',
    order: 0,
  });
  const [message, setMessage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return null;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', imageFile);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        return data.url;
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploadingImage(false);
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      // Upload image if file is selected
      let imageUrl = formData.image;
      if (imageFile) {
        const uploaded = await uploadImage();
        if (uploaded) {
          imageUrl = uploaded;
        }
      }

      const technologies = formData.technologies.split(',').map(t => t.trim()).filter(t => t);
      const projectData = {
        ...formData,
        image: imageUrl,
        technologies,
        order: parseInt(formData.order) || 0,
      };

      const url = editingProject ? `/api/projects/${editingProject.id}` : '/api/projects';
      const method = editingProject ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        setMessage(editingProject ? 'Project updated successfully!' : 'Project created successfully!');
        setTimeout(() => setMessage(''), 3000);
        setShowForm(false);
        setEditingProject(null);
        resetForm();
        setImageFile(null);
        setImagePreview('');
        loadProjects();
      } else {
        const error = await response.json();
        setMessage(`Error: ${error.error}`);
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image || '',
      liveLink: project.liveLink || '',
      githubLink: project.githubLink || '',
      featured: project.featured,
      technologies: project.technologies?.map(t => t.name).join(', ') || '',
      order: project.order,
    });
    setImagePreview(project.image || '');
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('Project deleted successfully!');
        setTimeout(() => setMessage(''), 3000);
        loadProjects();
      }
    } catch (error) {
      setMessage('Error deleting project.');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: '',
      liveLink: '',
      githubLink: '',
      featured: false,
      technologies: '',
      order: 0,
    });
    setImageFile(null);
    setImagePreview('');
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen bg-black text-white flex items-center justify-center ${manrope.className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D3E97A] mx-auto mb-4"></div>
          <p className="text-[#C7C7C7]">Loading projects...</p>
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
              Projects Management
            </h1>
          </div>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingProject(null);
              resetForm();
            }}
            className="bg-[#D3E97A] text-black px-4 py-2 rounded-lg hover:bg-white transition duration-300"
          >
            + Add New Project
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
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
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-[#C7C7C7] mb-2 text-sm font-medium">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#222222] border border-[#484848] rounded-lg px-4 py-3 text-white focus:border-[#D3E97A] focus:outline-none transition-colors"
                    placeholder="E-commerce Platform"
                  />
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
                    placeholder="Project description..."
                  ></textarea>
                </div>

                {/* Image Upload Section */}
                <div>
                  <label className="block text-[#C7C7C7] mb-3 text-sm font-medium">
                    Project Image
                  </label>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Upload from computer */}
                    <div>
                      <label className="block text-[#C7C7C7] mb-2 text-xs">
                        Upload from Computer
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full bg-[#222222] border border-[#484848] rounded-lg px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-[#D3E97A] file:text-black hover:file:bg-white file:cursor-pointer focus:border-[#D3E97A] focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Or use URL */}
                    <div>
                      <label htmlFor="image" className="block text-[#C7C7C7] mb-2 text-xs">
                        Or Enter Image URL
                      </label>
                      <input
                        type="text"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="w-full bg-[#222222] border border-[#484848] rounded-lg px-4 py-3 text-white focus:border-[#D3E97A] focus:outline-none transition-colors"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>

                  {/* Image Preview */}
                  {(imagePreview || formData.image) && (
                    <div className="mt-4">
                      <p className="text-[#C7C7C7] text-xs mb-2">Preview:</p>
                      <div className="relative w-full h-48 bg-[#222222] rounded-lg overflow-hidden border border-[#484848]">
                        <img
                          src={imagePreview || formData.image}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">

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
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="liveLink" className="block text-[#C7C7C7] mb-2 text-sm font-medium">
                      Live Demo URL
                    </label>
                    <input
                      type="url"
                      id="liveLink"
                      name="liveLink"
                      value={formData.liveLink}
                      onChange={handleChange}
                      className="w-full bg-[#222222] border border-[#484848] rounded-lg px-4 py-3 text-white focus:border-[#D3E97A] focus:outline-none transition-colors"
                      placeholder="https://demo.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="githubLink" className="block text-[#C7C7C7] mb-2 text-sm font-medium">
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      id="githubLink"
                      name="githubLink"
                      value={formData.githubLink}
                      onChange={handleChange}
                      className="w-full bg-[#222222] border border-[#484848] rounded-lg px-4 py-3 text-white focus:border-[#D3E97A] focus:outline-none transition-colors"
                      placeholder="https://github.com/..."
                    />
                  </div>
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
                    placeholder="React, Next.js, TypeScript, Tailwind CSS"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="w-5 h-5 bg-[#222222] border border-[#484848] rounded focus:ring-[#D3E97A]"
                  />
                  <label htmlFor="featured" className="ml-2 text-[#C7C7C7]">
                    Featured Project
                  </label>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={uploadingImage}
                    className="bg-[#D3E97A] text-black px-6 py-3 rounded-lg font-medium hover:bg-white transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {uploadingImage ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Uploading...
                      </>
                    ) : (
                      editingProject ? 'Update Project' : 'Create Project'
                    )}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingProject(null);
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

        {/* Projects List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-[#111111] rounded-xl p-6 border border-[#484848] hover:border-[#D3E97A] transition-colors"
            >
              {project.featured && (
                <span className="inline-block bg-[#D3E97A] text-black text-xs px-2 py-1 rounded-full mb-3">
                  Featured
                </span>
              )}
              <h3 className={`text-xl font-bold text-white mb-2 ${bebasNeue.className}`}>
                {project.title}
              </h3>
              <p className="text-[#C7C7C7] text-sm mb-4 line-clamp-3">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies?.slice(0, 3).map((tech, index) => (
                  <span
                    key={index}
                    className="bg-[#222222] text-[#D3E97A] px-2 py-1 rounded text-xs"
                  >
                    {tech.name}
                  </span>
                ))}
                {project.technologies?.length > 3 && (
                  <span className="text-[#C7C7C7] text-xs">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="flex-1 bg-[#D3E97A] text-black px-3 py-2 rounded-lg hover:bg-white transition text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="flex-1 bg-red-500/20 text-red-400 px-3 py-2 rounded-lg border border-red-500/30 hover:bg-red-500/30 transition text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#C7C7C7] text-lg mb-4">No projects yet</p>
            <button
              onClick={() => {
                setShowForm(true);
                setEditingProject(null);
                resetForm();
              }}
              className="bg-[#D3E97A] text-black px-6 py-3 rounded-lg hover:bg-white transition duration-300"
            >
              Add Your First Project
            </button>
          </div>
        )}
      </div>
    </div>
  );
}