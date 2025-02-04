import React from 'react';
import { Github, Linkedin, Download, Mail } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext.jsx';
import { AnimatedText } from './AnimatedText.jsx'
const SocialButton = ({ icon: Icon, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 hover:scale-110 bg-transparent hover:backdrop-blur-xl   shadow-sm hover:shadow-md"
  >
    <Icon className="w-5 h-5 text-slate-700 dark:text-slate-200 group-hover:scale-110 transition-transform duration-300" />
  </a>
);

const Home = () => {
  const { theme } = useTheme();
  const name = "Kartik Dhar";

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''} min-h-screen relative overflow-hidden`}>
      <div className="min-h-screen relative flex items-center justify-center p-8">
        <div className="max-w-4xl mx-auto text-center p-12 rounded-3xl">
          <h1 className="text-8xl font-black mb-8 animate-title">
            <span className="inline-block text-slate-900 dark:text-zinc-100">
             <AnimatedText text={name}/>
            </span>
          </h1>
          
          <p className="text-4xl font-bold mb-12 animate-fadeIn text-slate-800 dark:text-zinc-200">
            Frontend Developer | React Enthusiast
          </p>
          
          <div className="flex gap-6 justify-center mb-12">
            <SocialButton icon={Github} href="https://github.com/KartikDhar09" />
            <SocialButton icon={Linkedin} href="https://www.linkedin.com/in/kartik-dhar-295b3b2b9/" />
            <SocialButton icon={Mail} href="mailto:kartikdhar1309@gmail.com" />
          </div>
          
          <button className="group px-8 py-3 bg-slate-800 hover:bg-slate-700 dark:bg-slate-100 dark:hover:bg-slate-200 text-slate-200 dark:text-slate-700 text-lg font-medium rounded-xl shadow-sm hover:shadow-md transform transition-all duration-300 hover:scale-105 flex items-center gap-3 mx-auto">
            <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-300" />
            <span>Download Resume</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;