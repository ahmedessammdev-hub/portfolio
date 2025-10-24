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

export default function AdminContact() {
  const [contactInfo, setContactInfo] = useState(null);
  const [contactMethods, setContactMethods] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('info'); // info, methods, submissions
  const [showMethodForm, setShowMethodForm] = useState(false);
  const [editingMethod, setEditingMethod] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    email: '',
    phone: '',
    location: '',
    github: '',
    linkedin: '',
    twitter: '',
  });
  const [methodData, setMethodData] = useState({
    icon: '',
    title: '',
    description: '',
    value: '',
    link: '',
    order: 0,
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadContactData();
  }, []);

  const loadContactData = async () => {
    try {
      const response = await fetch('/api/contact');
      if (response.ok) {
        const data = await response.json();
        setContactInfo(data.contactInfo);
        setContactMethods(data.contactMethods);
        
        if (data.contactInfo) {
          setFormData({
            title: data.contactInfo.title || '',
            subtitle: data.contactInfo.subtitle || '',
            email: data.contactInfo.email || '',
            phone: data.contactInfo.phone || '',
            location: data.contactInfo.location || '',
            github: data.contactInfo.github || '',
            linkedin: data.contactInfo.linkedin || '',
            twitter: data.contactInfo.twitter || '',
          });
        }
      }

      // Load submissions
      const submissionsResponse = await fetch('/api/contact/submissions');
      if (submissionsResponse.ok) {
        const submissionsData = await submissionsResponse.json();
        setSubmissions(submissionsData);
      }
    } catch (error) {
      console.error('Error loading contact data:', error);
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

  const handleMethodChange = (e) => {
    setMethodData({
      ...methodData,
      [e.target.name]: e.target.value,
    });
  };

  const handleInfoSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('/api/contact/info', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Contact information updated successfully!');
        setTimeout(() => setMessage(''), 3000);
        loadContactData();
      } else {
        const error = await response.json();
        setMessage(`Error: ${error.error}`);
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    }
  };

  const handleMethodSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const url = editingMethod 
        ? `/api/contact/methods/${editingMethod.id}` 
        : '/api/contact/methods';
      const method = editingMethod ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...methodData,
          order: parseInt(methodData.order) || 0,
        }),
      });

      if (response.ok) {
        setMessage(editingMethod ? 'Method updated successfully!' : 'Method created successfully!');
        setTimeout(() => setMessage(''), 3000);
        setShowMethodForm(false);
        setEditingMethod(null);
        resetMethodForm();
        loadContactData();
      } else {
        const error = await response.json();
        setMessage(`Error: ${error.error}`);
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    }
  };

  const handleEditMethod = (method) => {
    setEditingMethod(method);
    setMethodData({
      icon: method.icon || '',
      title: method.title,
      description: method.description || '',
      value: method.value,
      link: method.link || '',
      order: method.order,
    });
    setShowMethodForm(true);
  };

  const handleDeleteMethod = async (id) => {
    if (!confirm('Are you sure you want to delete this method?')) return;

    try {
      const response = await fetch(`/api/contact/methods/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('Method deleted successfully!');
        setTimeout(() => setMessage(''), 3000);
        loadContactData();
      }
    } catch (error) {
      setMessage('Error deleting method.');
    }
  };

  const resetMethodForm = () => {
    setMethodData({
      icon: '',
      title: '',
      description: '',
      value: '',
      link: '',
      order: 0,
    });
  };

  const markAsRead = async (id) => {
    try {
      const response = await fetch(`/api/contact/submissions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isRead: true }),
      });

      if (response.ok) {
        loadContactData();
      }
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen bg-black text-white flex items-center justify-center ${manrope.className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D3E97A] mx-auto mb-4"></div>
          <p className="text-[#C7C7C7]">Loading contact data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-black text-white ${manrope.className}`}>
      {/* Header */}
      <header className="border-b border-[#484848] bg-[#111111]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/dashboard"
                className="text-[#C7C7C7] hover:text-[#D3E97A] transition-colors"
              >
                ← Back to Dashboard
              </Link>
              <h1 className={`text-2xl font-bold text-[#D3E97A] ${bebasNeue.className}`}>
                Contact Management
              </h1>
            </div>
            {activeTab === 'methods' && (
              <button
                onClick={() => {
                  setShowMethodForm(true);
                  setEditingMethod(null);
                  resetMethodForm();
                }}
                className="bg-[#D3E97A] text-black px-4 py-2 rounded-lg hover:bg-white transition duration-300"
              >
                + Add Method
              </button>
            )}
          </div>

          {/* Tabs */}
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('info')}
              className={`px-4 py-2 rounded-lg transition ${
                activeTab === 'info'
                  ? 'bg-[#D3E97A] text-black'
                  : 'bg-[#222222] text-[#C7C7C7] hover:bg-[#333333]'
              }`}
            >
              Contact Info
            </button>
            <button
              onClick={() => setActiveTab('methods')}
              className={`px-4 py-2 rounded-lg transition ${
                activeTab === 'methods'
                  ? 'bg-[#D3E97A] text-black'
                  : 'bg-[#222222] text-[#C7C7C7] hover:bg-[#333333]'
              }`}
            >
              Contact Methods
            </button>
            <button
              onClick={() => setActiveTab('submissions')}
              className={`px-4 py-2 rounded-lg transition relative ${
                activeTab === 'submissions'
                  ? 'bg-[#D3E97A] text-black'
                  : 'bg-[#222222] text-[#C7C7C7] hover:bg-[#333333]'
              }`}
            >
              Submissions
              {submissions.filter(s => !s.isRead).length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {submissions.filter(s => !s.isRead).length}
                </span>
              )}
            </button>
          </div>
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

        {/* Contact Info Tab */}
        {activeTab === 'info' && (
          <div className="bg-[#111111] rounded-xl p-8 border border-[#484848]">
            <h2 className={`text-3xl font-bold text-white mb-6 ${bebasNeue.className}`}>
              Contact Information
            </h2>

            <form onSubmit={handleInfoSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="title" className="block text-[#C7C7C7] mb-2 text-sm font-medium">
                    Section Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full bg-[#222222] border border-[#484848] rounded-lg px-4 py-3 text-white focus:border-[#D3E97A] focus:outline-none transition-colors"
                    placeholder="Let's Connect"
                  />
                </div>

                <div>
                  <label htmlFor="subtitle" className="block text-[#C7C7C7] mb-2 text-sm font-medium">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    id="subtitle"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleChange}
                    className="w-full bg-[#222222] border border-[#484848] rounded-lg px-4 py-3 text-white focus:border-[#D3E97A] focus:outline-none transition-colors"
                    placeholder="Say hello"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-[#C7C7C7] mb-2 text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#222222] border border-[#484848] rounded-lg px-4 py-3 text-white focus:border-[#D3E97A] focus:outline-none transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-[#C7C7C7] mb-2 text-sm font-medium">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-[#222222] border border-[#484848] rounded-lg px-4 py-3 text-white focus:border-[#D3E97A] focus:outline-none transition-colors"
                    placeholder="+1 234 567 890"
                  />
                </div>
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

              <div className="grid md:grid-cols-3 gap-6">
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

                <div>
                  <label htmlFor="linkedin" className="block text-[#C7C7C7] mb-2 text-sm font-medium">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    id="linkedin"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className="w-full bg-[#222222] border border-[#484848] rounded-lg px-4 py-3 text-white focus:border-[#D3E97A] focus:outline-none transition-colors"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>

                <div>
                  <label htmlFor="twitter" className="block text-[#C7C7C7] mb-2 text-sm font-medium">
                    Twitter URL
                  </label>
                  <input
                    type="url"
                    id="twitter"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleChange}
                    className="w-full bg-[#222222] border border-[#484848] rounded-lg px-4 py-3 text-white focus:border-[#D3E97A] focus:outline-none transition-colors"
                    placeholder="https://twitter.com/username"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#D3E97A] text-black px-6 py-3 rounded-lg font-medium hover:bg-white transition duration-300"
              >
                Update Contact Info
              </button>
            </form>
          </div>
        )}

        {/* Contact Methods Tab */}
        {activeTab === 'methods' && (
          <>
            {showMethodForm && (
              <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                <div className="bg-[#111111] rounded-xl p-8 border border-[#484848] max-w-md w-full">
                  <h2 className={`text-3xl font-bold text-[#D3E97A] mb-6 ${bebasNeue.className}`}>
                    {editingMethod ? 'Edit Method' : 'Add New Method'}
                  </h2>

                  <form onSubmit={handleMethodSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="icon" className="block text-[#C7C7C7] mb-2 text-sm font-medium">
                        Icon (emoji or text)
                      </label>
                      <input
                        type="text"
                        id="icon"
                        name="icon"
                        value={methodData.icon}
                        onChange={handleMethodChange}
                        className="w-full bg-[#222222] border border-[#484848] rounded-lg px-4 py-3 text-white focus:border-[#D3E97A] focus:outline-none transition-colors"
                        placeholder="📧"
                      />
                    </div>

                    <div>
                      <label htmlFor="title" className="block text-[#C7C7C7] mb-2 text-sm font-medium">
                        Title *
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={methodData.title}
                        onChange={handleMethodChange}
                        required
                        className="w-full bg-[#222222] border border-[#484848] rounded-lg px-4 py-3 text-white focus:border-[#D3E97A] focus:outline-none transition-colors"
                        placeholder="Email"
                      />
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-[#C7C7C7] mb-2 text-sm font-medium">
                        Description
                      </label>
                      <input
                        type="text"
                        id="description"
                        name="description"
                        value={methodData.description}
                        onChange={handleMethodChange}
                        className="w-full bg-[#222222] border border-[#484848] rounded-lg px-4 py-3 text-white focus:border-[#D3E97A] focus:outline-none transition-colors"
                        placeholder="Send me an email"
                      />
                    </div>

                    <div>
                      <label htmlFor="value" className="block text-[#C7C7C7] mb-2 text-sm font-medium">
                        Value *
                      </label>
                      <input
                        type="text"
                        id="value"
                        name="value"
                        value={methodData.value}
                        onChange={handleMethodChange}
                        required
                        className="w-full bg-[#222222] border border-[#484848] rounded-lg px-4 py-3 text-white focus:border-[#D3E97A] focus:outline-none transition-colors"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="link" className="block text-[#C7C7C7] mb-2 text-sm font-medium">
                        Link
                      </label>
                      <input
                        type="url"
                        id="link"
                        name="link"
                        value={methodData.link}
                        onChange={handleMethodChange}
                        className="w-full bg-[#222222] border border-[#484848] rounded-lg px-4 py-3 text-white focus:border-[#D3E97A] focus:outline-none transition-colors"
                        placeholder="mailto:your.email@example.com"
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
                        value={methodData.order}
                        onChange={handleMethodChange}
                        className="w-full bg-[#222222] border border-[#484848] rounded-lg px-4 py-3 text-white focus:border-[#D3E97A] focus:outline-none transition-colors"
                        placeholder="0"
                      />
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        type="submit"
                        className="bg-[#D3E97A] text-black px-6 py-3 rounded-lg font-medium hover:bg-white transition duration-300"
                      >
                        {editingMethod ? 'Update Method' : 'Create Method'}
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => {
                          setShowMethodForm(false);
                          setEditingMethod(null);
                          resetMethodForm();
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

            <div className="grid md:grid-cols-2 gap-6">
              {contactMethods.map((method) => (
                <div
                  key={method.id}
                  className="bg-[#111111] rounded-xl p-6 border border-[#484848] hover:border-[#D3E97A] transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      {method.icon && <span className="text-3xl">{method.icon}</span>}
                      <div>
                        <h3 className={`text-xl font-bold text-white ${bebasNeue.className}`}>
                          {method.title}
                        </h3>
                        {method.description && (
                          <p className="text-[#C7C7C7] text-sm">{method.description}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditMethod(method)}
                        className="text-[#D3E97A] hover:text-white text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteMethod(method.id)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="text-[#D3E97A]">{method.value}</p>
                  {method.link && (
                    <a
                      href={method.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C7C7C7] hover:text-white text-sm underline"
                    >
                      {method.link}
                    </a>
                  )}
                </div>
              ))}
            </div>

            {contactMethods.length === 0 && (
              <div className="text-center py-12 bg-[#111111] rounded-xl border border-[#484848]">
                <p className="text-[#C7C7C7] text-lg mb-4">No contact methods yet</p>
                <button
                  onClick={() => {
                    setShowMethodForm(true);
                    setEditingMethod(null);
                    resetMethodForm();
                  }}
                  className="bg-[#D3E97A] text-black px-6 py-3 rounded-lg hover:bg-white transition duration-300"
                >
                  Add Your First Method
                </button>
              </div>
            )}
          </>
        )}

        {/* Submissions Tab */}
        {activeTab === 'submissions' && (
          <>
            {selectedSubmission && (
              <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                <div className="bg-[#111111] rounded-xl p-8 border border-[#484848] max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-start mb-6">
                    <h2 className={`text-3xl font-bold text-[#D3E97A] ${bebasNeue.className}`}>
                      Message Details
                    </h2>
                    <button
                      onClick={() => {
                        setSelectedSubmission(null);
                        if (!selectedSubmission.isRead) {
                          markAsRead(selectedSubmission.id);
                        }
                      }}
                      className="text-[#C7C7C7] hover:text-white text-2xl"
                    >
                      ×
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[#C7C7C7] mb-1 text-sm">From</label>
                      <p className="text-white font-semibold">{selectedSubmission.name}</p>
                    </div>

                    <div>
                      <label className="block text-[#C7C7C7] mb-1 text-sm">Email</label>
                      <p className="text-white">{selectedSubmission.email}</p>
                    </div>

                    {selectedSubmission.subject && (
                      <div>
                        <label className="block text-[#C7C7C7] mb-1 text-sm">Subject</label>
                        <p className="text-white">{selectedSubmission.subject}</p>
                      </div>
                    )}

                    {selectedSubmission.projectType && (
                      <div>
                        <label className="block text-[#C7C7C7] mb-1 text-sm">Project Type</label>
                        <p className="text-white">{selectedSubmission.projectType}</p>
                      </div>
                    )}

                    <div>
                      <label className="block text-[#C7C7C7] mb-1 text-sm">Message</label>
                      <p className="text-white whitespace-pre-wrap">{selectedSubmission.message}</p>
                    </div>

                    <div>
                      <label className="block text-[#C7C7C7] mb-1 text-sm">Received</label>
                      <p className="text-white">{new Date(selectedSubmission.createdAt).toLocaleString()}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      window.location.href = `mailto:${selectedSubmission.email}`;
                    }}
                    className="w-full mt-6 bg-[#D3E97A] text-black px-6 py-3 rounded-lg font-medium hover:bg-white transition duration-300"
                  >
                    Reply via Email
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {submissions.map((submission) => (
                <div
                  key={submission.id}
                  className={`bg-[#111111] rounded-xl p-6 border cursor-pointer transition-colors ${
                    submission.isRead 
                      ? 'border-[#484848] hover:border-[#666666]' 
                      : 'border-[#D3E97A] hover:border-white'
                  }`}
                  onClick={() => setSelectedSubmission(submission)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className={`text-xl font-bold text-white ${bebasNeue.className}`}>
                          {submission.name}
                        </h3>
                        {!submission.isRead && (
                          <span className="bg-[#D3E97A] text-black text-xs px-2 py-1 rounded-full">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-[#C7C7C7] mb-2">{submission.email}</p>
                      {submission.subject && (
                        <p className="text-white font-semibold mb-2">{submission.subject}</p>
                      )}
                      <p className="text-[#C7C7C7] line-clamp-2">{submission.message}</p>
                    </div>
                    <span className="text-[#C7C7C7] text-sm">
                      {new Date(submission.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {submissions.length === 0 && (
              <div className="text-center py-12 bg-[#111111] rounded-xl border border-[#484848]">
                <p className="text-[#C7C7C7] text-lg">No submissions yet</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}