import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Navbar} from './components/navbar/Navbar.jsx';
import { Home, About, Skills, Projects, Contact } from './components/pages/index.js';
import {ThemeToggle} from './components/ThemeToggle.jsx';
import {Background} from './components/Background.jsx';

export const AppContent = () => {
    return (
      <Router>
        <div >
          <Navbar />
          <Background />
          <main >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <ThemeToggle />
        </div>
      </Router>
    );
  };
  