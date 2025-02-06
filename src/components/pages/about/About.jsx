import React from "react";
import { Briefcase, GraduationCap, Sparkles, Rocket } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext.jsx";
import { experiences } from "./experiences.js";
import { educationDetails } from "./educationDetails.js";
import { TimelineSection } from "./TimelineSection.jsx";

const About = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`h-screen py-8 flex items-start justify-center relative overflow-hidden bg-transparent
      ${theme === "dark" ? "text-zinc-100" : "text-slate-900"}`}
    >
      <div className="container mx-auto px-4 relative z-10 w-full max-w-6xl">
        <div className=" p-4 rounded-3xl backdrop-blur-lg">
          <div className="flex items-center justify-center space-x-4 mb-2">
            <Rocket className={`w-10 h-10 animate-bounce ${theme === "dark" ? "text-zinc-400" : "text-slate-600"}`} />
            <h2 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-800 via-slate-600 to-slate-900 dark:from-zinc-100 dark:via-zinc-300 dark:to-zinc-100">
              About My Journey
            </h2>
            <Sparkles className={`w-10 h-10 animate-spin ${theme === "dark" ? "text-zinc-400" : "text-slate-600"}`} />
          </div>

          <div className="p-4 rounded-2xl backdrop-blur-lg border border-transparent">
            <p className="text-base md:text-lg leading-relaxed tracking-wide text-center font-medium">
              Frontend developer with a passion for crafting pixel-perfect, interactive experiences.
              <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-900 dark:from-zinc-200 dark:to-zinc-400">
                Transforming design dreams into digital realities, one line of code at a time.
              </span>
              <span className="block mt-1 font-bold">
                Always learning, always innovating! 
              </span>
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-3xl p-4 w-full backdrop-blur-lg h-full">
            <div className="flex items-center justify-center mb-2 space-x-4">
              <GraduationCap className={`w-10 h-10 ${theme === "dark" ? "text-zinc-400" : "text-slate-600"}`}/>
              <h3 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-700 to-slate-900 dark:from-zinc-200 dark:to-zinc-400">
                Education
              </h3>
            </div>
            <TimelineSection
              items={educationDetails}
              theme={theme}
              iconComponent={GraduationCap}
              titleClasses={`
                transition-colors duration-300
                ${
                  theme === "dark"
                    ? "text-zinc-200 hover:text-zinc-400"
                    : "text-slate-800 hover:text-slate-600"
                }
              `}
              iconClasses={`
                transition-all duration-300 hover:scale-110 hover:rotate-12
                ${theme === "dark" ? "text-zinc-400" : "text-slate-600"}
              `}
            />
          </div>

          <div className="rounded-3xl p-4 w-full backdrop-blur-lg h-full">
            <div className="flex items-center justify-center mb-2 space-x-4">
              <Briefcase className={`w-10 h-10 ${theme === "dark" ? "text-zinc-400" : "text-slate-600"}`}/>
              <h3 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-700 to-slate-900 dark:from-zinc-200 dark:to-zinc-400">
                Experience
              </h3>
            </div>

            <TimelineSection
              items={experiences}
              theme={theme}
              iconComponent={Briefcase}
              titleClasses={`
                transition-colors duration-300
                ${
                  theme === "dark"
                    ? "text-zinc-200 hover:text-zinc-400"
                    : "text-slate-800 hover:text-slate-600"
                }
              `}
              iconClasses={`
                transition-all duration-300 hover:scale-110 hover:rotate-12
                ${theme === "dark" ? "text-zinc-400" : "text-slate-600"}
              `}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;