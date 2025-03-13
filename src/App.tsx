import React from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Agencies from './components/Agencies';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen">
      <Toaster position="top-right" />
      <Navbar />
      <div id="hero">
        <Hero />
      </div>
      <div id="services">
        <Services />
      </div>
      <div id="agencies">
        <Agencies />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </div>
  );
}

export default App;