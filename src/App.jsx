import React, { useRef,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar.jsx';
import Home from './components/pages/home/Home.jsx';
import About from './components/pages/about/About.jsx';
import Skills from './components/pages/skills/Skills.jsx';
import Projects from './components/pages/project/Projects.jsx';
import Contact from './components/pages/contact/Contact.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
import Background from './components/Background.jsx';

// Create a container component for all sections
const Sections = () => {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  
  const location = useLocation();

  // Scroll to section based on current route
  useEffect(() => {
    const refs = {
      '/': homeRef,
      '/about': aboutRef,
      '/skills': skillsRef,
      '/projects': projectsRef,
      '/contact': contactRef
    };

    const currentRef = refs[location.pathname];
    if (currentRef && currentRef.current) {
      currentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className="flex flex-col gap-0">
      <section ref={homeRef} className="min-h-screen w-full snap-start">
        <Home />
      </section>
      <section ref={aboutRef} className="min-h-screen w-full snap-start">
        <About />
      </section>
      <section ref={skillsRef} className="min-h-screen w-full snap-start">
        <Skills />
      </section>
      <section ref={projectsRef} className="min-h-screen w-full snap-start">
        <Projects />
      </section>
      <section ref={contactRef} className="min-h-screen w-full snap-start">
        <Contact />
      </section>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-900 dark:text-gray-100 relative">
        <Background />
        <ThemeToggle />
        <Navbar />
        <main className="ml-28 w-[calc(100%-7rem)] h-screen overflow-y-auto snap-y snap-mandatory">
          <div className="w-full max-w-8xl mx-auto backdrop-blur-sm">
            <Routes>
              <Route path="/*" element={<Sections />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;