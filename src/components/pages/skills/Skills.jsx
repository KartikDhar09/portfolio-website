import React from 'react';

const Skills = () => {
  const skills = [
    { name: 'React', level: 90 },
    { name: 'JavaScript', level: 85 },
    { name: 'TypeScript', level: 75 },
    { name: 'Tailwind CSS', level: 80 },
    { name: 'HTML/CSS', level: 95 },
    { name: 'Git', level: 70 }
  ];

  return (
    <div className="min-h-screen flex items-center">
      <div className="w-full">
        <h2 className="text-3xl font-bold text-center mb-12">My Skills</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {skills.map((skill) => (
            <div key={skill.name} className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="font-medium">{skill.name}</span>
                <span className="text-gray-600">{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;