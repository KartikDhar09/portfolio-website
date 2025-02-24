import React, { memo } from 'react';
import { motion } from "framer-motion";

//  animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, delay: index * 0.05 }
  })
};

const iconVariants = {
  animate: {
    rotate: [0, 10, -10, 10, -10, 0],
    transition: { duration: 1, repeat: Infinity, repeatDelay: 1 }
  }
};

//  Skill Item component
const SkillItem = memo(({ skill, index }) => (
  <motion.div
    key={skill.name}
    variants={itemVariants}
    custom={index}
    className="relative rounded-md p-2 flex flex-col items-center justify-center"
  >
    <motion.div
      className="relative mb-2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
      variants={iconVariants}
      animate="animate"
    >
      <img
        src={skill.icon}
        alt={`${skill.name} icon`}
        className="w-full h-full object-contain text-zinc-900 dark:text-zinc-100"
        loading="lazy"
        decoding="async"
      />
    </motion.div>

    <h3 className="text-xs sm:text-sm md:text-base font-medium text-center text-zinc-800 dark:text-zinc-200 line-clamp-2">
      {skill.name}
    </h3>
  </motion.div>
));

SkillItem.displayName = 'SkillItem';

export const SkillSection = memo(({ skills }) => {
  if (!skills?.length) return null;

  return (
    <motion.div 
      className="w-full max-w-5xl mx-auto px-2 py-4 md:py-6 overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
        {skills.map((skill, index) => (
          <SkillItem 
            key={skill.name} 
            skill={skill} 
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
});

SkillSection.displayName = 'SkillSection';