import React from 'react'
import Navbar from './components/Navbar'

import "./globals.css";
import Hero from './components/Hero/Hero';
import About from './About/About';
import Experience from './components/Experience/Experience';
import Projects from './components/Projects/Projects';
import Skills from './components/Skills/Skills';
import Education from './components/Education/Education';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
export default function page() {
  return (
    <div className='page'>
      <Navbar />
      <Hero />
      <About/>
      <Experience/>
      <Projects/>
      <Skills/>
      <Education/>
      <Contact/>
      <Footer/>
    </div>
  );
}
