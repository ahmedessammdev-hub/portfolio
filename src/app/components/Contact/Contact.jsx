"use client";
import React, { useState, useEffect } from "react";
import { Bebas_Neue, Manrope } from "next/font/google";
import Github from "../icons/Github";
import Linkedin from "../icons/Linkedin";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400"],
});
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Contact() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    projectType: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  useEffect(() => {
    async function fetchContactInfo() {
      try {
        const [infoRes, methodsRes] = await Promise.all([
          fetch('/api/contact/info'),
          fetch('/api/contact/methods')
        ]);
        
        const info = await infoRes.json();
        const methods = await methodsRes.json();
        
        setData({
          ...info,
          contactMethods: methods
        });
      } catch (error) {
        console.error('Error fetching contact info:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchContactInfo();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        projectType: ""
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <section id="contact" className={`py-24 bg-black text-white ${bebasNeue.className}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <div className="flex items-center justify-center gap-3">
            <svg className="animate-spin h-8 w-8 text-[#D3E97A]" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className={`text-[#C7C7C7] ${manrope.className}`}>Loading contact information...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!data) {
    return (
      <section id="contact" className={`py-24 bg-black text-white ${bebasNeue.className}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <p className={`text-[#C7C7C7] ${manrope.className}`}>Failed to load contact information.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className={`py-24 bg-black text-white ${bebasNeue.className}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl mb-4">
            <span className="text-[#D3E97A]">{data.title}</span>
          </h2>
          <p className={`text-[#C7C7C7] text-lg md:text-xl max-w-2xl mx-auto ${manrope.className}`}>
            {data.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className={`text-3xl md:text-4xl text-[#D3E97A] mb-8 ${bebasNeue.className}`}>
              Get In Touch
            </h3>
            
            <p className={`text-[#C7C7C7] text-lg mb-8 ${manrope.className} leading-relaxed`}>
              I'm always interested in new opportunities and exciting projects. 
              Whether you have a question about my work, want to collaborate, or just 
              want to say hello, I'd love to hear from you.
            </p>

            {/* Contact Methods */}
            <div className="space-y-6 mb-8">
              {data.contactMethods && data.contactMethods.length > 0 ? (
                data.contactMethods.map((method) => (
                  <a
                    key={method.id}
                    href={method.link}
                    className="flex items-start gap-4 p-4 bg-[#111111] rounded-xl border border-[#484848] hover:border-[#D3E97A] transition-colors duration-300 group"
                  >
                    <span className="text-2xl mt-1">{method.icon}</span>
                    <div>
                      <h4 className={`text-[#D3E97A] text-lg ${bebasNeue.className} group-hover:text-white transition-colors`}>
                        {method.title}
                      </h4>
                      <p className={`text-[#C7C7C7] text-sm ${manrope.className} mb-1`}>
                        {method.description}
                      </p>
                      <p className={`text-white ${manrope.className} font-medium`}>
                        {method.value}
                      </p>
                    </div>
                  </a>
                ))
              ) : (
                <p className={`text-[#C7C7C7] ${manrope.className}`}>No contact methods available.</p>
              )}
            </div>

            {/* Social Links */}
            {data.socialLinks && (
              <div>
                <h4 className={`text-[#D3E97A] text-xl mb-4 ${bebasNeue.className}`}>
                  Follow Me
                </h4>
                <div className="flex gap-4">
                  {data.socialLinks.linkedin && (
                    <a
                      href={data.socialLinks.linkedin}
                      className="bg-[#222222] p-3 rounded-full text-white hover:bg-[#D3E97A] transition duration-300"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin color="#D3E97A" hoverColor="white" />
                    </a>
                  )}
                  {data.socialLinks.github && (
                    <a
                      href={data.socialLinks.github}
                      className="bg-[#222222] p-3 rounded-full text-white hover:bg-[#D3E97A] transition duration-300"
                      aria-label="GitHub Profile"
                    >
                      <Github color="#D3E97A" hoverColor="white" />
                    </a>
                  )}
                  {data.socialLinks.twitter && (
                    <a
                      href={data.socialLinks.twitter}
                      className="bg-[#222222] p-3 rounded-full text-white hover:bg-[#D3E97A] transition duration-300 flex items-center justify-center"
                      aria-label="Twitter Profile"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Contact Form */}
          <div>
            <h3 className={`text-3xl md:text-4xl text-[#D3E97A] mb-8 ${bebasNeue.className}`}>
              Send Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Email Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-[#C7C7C7] ${manrope.className} mb-2`} htmlFor="name">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={`w-full bg-[#111111] border border-[#484848] rounded-lg px-4 py-3 text-white ${manrope.className} focus:border-[#D3E97A] focus:outline-none transition-colors`}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className={`block text-[#C7C7C7] ${manrope.className} mb-2`} htmlFor="email">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full bg-[#111111] border border-[#484848] rounded-lg px-4 py-3 text-white ${manrope.className} focus:border-[#D3E97A] focus:outline-none transition-colors`}
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Project Type */}
              <div>
                <label className={`block text-[#C7C7C7] ${manrope.className} mb-2`} htmlFor="projectType">
                  Project Type
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  className={`w-full bg-[#111111] border border-[#484848] rounded-lg px-4 py-3 text-white ${manrope.className} focus:border-[#D3E97A] focus:outline-none transition-colors`}
                >
                  <option value="">Select project type</option>
                  <option value="website">Website Development</option>
                  <option value="webapp">Web Application</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="mobile">Mobile App</option>
                  <option value="consultation">Consultation</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Subject */}
              <div>
                <label className={`block text-[#C7C7C7] ${manrope.className} mb-2`} htmlFor="subject">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className={`w-full bg-[#111111] border border-[#484848] rounded-lg px-4 py-3 text-white ${manrope.className} focus:border-[#D3E97A] focus:outline-none transition-colors`}
                  placeholder="Project inquiry"
                />
              </div>

              {/* Message */}
              <div>
                <label className={`block text-[#C7C7C7] ${manrope.className} mb-2`} htmlFor="message">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="5"
                  className={`w-full bg-[#111111] border border-[#484848] rounded-lg px-4 py-3 text-white ${manrope.className} focus:border-[#D3E97A] focus:outline-none transition-colors resize-none`}
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-[#D3E97A] text-black py-3 px-6 rounded-lg ${manrope.className} font-medium hover:bg-white transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                  <p className={`text-green-400 ${manrope.className}`}>
                    ✅ Message sent successfully! I'll get back to you soon.
                  </p>
                </div>
              )}
              
              {submitStatus === "error" && (
                <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
                  <p className={`text-red-400 ${manrope.className}`}>
                    ❌ Something went wrong. Please try again or contact me directly.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Quick Response Promise */}
        <div className="text-center mt-16 bg-[#111111] rounded-xl p-8 border border-[#484848]">
          <h3 className={`text-2xl md:text-3xl text-[#D3E97A] mb-4 ${bebasNeue.className}`}>
            Quick Response Guaranteed
          </h3>
          <p className={`text-[#C7C7C7] ${manrope.className} max-w-2xl mx-auto`}>
            I typically respond to all inquiries within 24 hours. For urgent projects, 
            feel free to call me directly. I'm always excited to discuss new opportunities!
          </p>
        </div>
      </div>
    </section>
  );
}