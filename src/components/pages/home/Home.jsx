import React from 'react';
import { Github, Linkedin, Download, Mail } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext.jsx';
import { AnimatedText } from './AnimatedText.jsx';

const SocialButton = ({ icon: Icon, href }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        group flex items-center justify-center
        w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11
        rounded-xl transition-all duration-300
        hover:scale-110 bg-transparent
        hover:backdrop-blur-xl shadow-sm hover:shadow-md
      `}
    >
      <Icon className={`
        w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 lg:w-5.5 lg:h-5.5
        text-slate-700 dark:text-slate-200
        group-hover:scale-110
        transition-transform duration-300
      `} />
    </a>
  );
};

export const Home = () => {
  const { theme } = useTheme();
  const name = "Kartik Dhar";

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Kartik_Dhar_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`
      ${theme === 'dark' ? 'dark' : ''}
      h-dvh w-full flex flex-col items-center justify-center relative
      px-4 sm:px-6 md:px-8 lg:px-12
    `}>
      <div className="w-full max-w-3xl mx-auto text-center">
        <div className="space-y-4">
          <h1 className={`
            text-4xl sm:text-5xl md:text-7xl lg:text-8xl
            font-black leading-tight
            text-slate-900 dark:text-zinc-100
          `}>
            <AnimatedText text={name}/>
          </h1>

          <p className={`
            text-xs sm:text-sm md:text-lg lg:text-xl
            font-bold leading-relaxed
            text-slate-800 dark:text-zinc-200
            flex flex-wrap justify-center items-center gap-x-1
          `}>
            <span>Frontend Developer</span>
            <span className="inline-block">|</span>
            <span>React Enthusiast</span>
          </p>

          <div className="flex gap-3 justify-center my-4">
            <SocialButton icon={Github} href="https://github.com/KartikDhar09" />
            <SocialButton icon={Linkedin} href="https://www.linkedin.com/in/kartik-dhar-295b3b2b9/" />
            <SocialButton icon={Mail} href="mailto:kartikdhar1309@gmail.com" />
          </div>

          <button
            onClick={handleDownload}
            className={`
              group px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3
              bg-slate-800 hover:bg-slate-700
              dark:bg-slate-100 dark:hover:bg-slate-200
              text-slate-200 dark:text-slate-700
              text-xs sm:text-sm md:text-base
              font-medium rounded-xl
              shadow-sm hover:shadow-md
              transform transition-all duration-300
              hover:scale-105
              flex items-center gap-2 mx-auto
            `}
          >
            <Download className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 group-hover:translate-y-0.5 transition-transform duration-300" />
            <span>Download Resume</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
