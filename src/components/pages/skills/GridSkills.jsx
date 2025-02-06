import React, { useEffect, useRef, useState } from 'react';

export const GridSkills = ({ skills }) => {
    const ICON_SIZE = 64;
    const GRID_COLUMNS = 6;
    const GRID_GAP = 32;
    const MIN_DISTANCE = ICON_SIZE * 2;
    
    const totalGridWidth = GRID_COLUMNS * (ICON_SIZE + GRID_GAP) - GRID_GAP;
    const numRows = Math.ceil(skills.length / GRID_COLUMNS);
    const totalGridHeight = numRows * (ICON_SIZE + GRID_GAP) - GRID_GAP;
    
    const SVG_WIDTH = 800;
    const SVG_HEIGHT = Math.max(500, totalGridHeight + 100);
    
    const GRID_START_X = (SVG_WIDTH - totalGridWidth) / 2;
    const GRID_START_Y = (SVG_HEIGHT - totalGridHeight) / 2;
    
    const [particles, setParticles] = useState([]);
    const animationRef = useRef();
  
    const getGridPosition = (index) => {
      const row = Math.floor(index / GRID_COLUMNS);
      const col = index % GRID_COLUMNS;
      return {
        x: GRID_START_X + (col * (ICON_SIZE + GRID_GAP)),
        y: GRID_START_Y + (row * (ICON_SIZE + GRID_GAP))
      };
    };
  
    const initializeParticles = () => {
      return skills.map((skill, index) => {
        const gridPos = getGridPosition(index);
        return {
          id: index,
          x: gridPos.x,
          y: gridPos.y,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          targetX: gridPos.x,
          targetY: gridPos.y,
          gridX: gridPos.x,
          gridY: gridPos.y,
          isScattered: false
        };
      });
    };
  
    const applyBoundaryForces = (particle) => {
      const padding = ICON_SIZE;
      const boundaryForce = 0.5;
      
      if (particle.x < padding) particle.vx += boundaryForce;
      if (particle.x > SVG_WIDTH - padding) particle.vx -= boundaryForce;
      if (particle.y < padding) particle.vy += boundaryForce;
      if (particle.y > SVG_HEIGHT - padding) particle.vy -= boundaryForce;
    };
  
    const applyCollisionAvoidance = (particles) => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - particles[i].x;
          const dy = particles[j].y - particles[i].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < MIN_DISTANCE) {
            const angle = Math.atan2(dy, dx);
            const force = (MIN_DISTANCE - distance) * 0.05;
            
            particles[j].vx += Math.cos(angle) * force;
            particles[j].vy += Math.sin(angle) * force;
            particles[i].vx -= Math.cos(angle) * force;
            particles[i].vy -= Math.sin(angle) * force;
          }
        }
      }
    };
  
    const updateParticles = () => {
      setParticles(prevParticles => {
        const newParticles = prevParticles.map(particle => {
          const dx = particle.targetX - particle.x;
          const dy = particle.targetY - particle.y;
          
          particle.vx = particle.vx * 0.95 + dx * 0.001;
          particle.vy = particle.vy * 0.95 + dy * 0.001;
          
          return {
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy
          };
        });
  
        applyCollisionAvoidance(newParticles);
        newParticles.forEach(particle => applyBoundaryForces(particle));
        
        return newParticles;
      });
  
      animationRef.current = requestAnimationFrame(updateParticles);
    };
  
    const toggleScatter = () => {
      setParticles(prevParticles => {
        return prevParticles.map(particle => {
          const padding = ICON_SIZE * 2;
          const isScattered = !particle.isScattered;
          
          return {
            ...particle,
            targetX: isScattered ? 
              padding + Math.random() * (SVG_WIDTH - padding * 2) :
              particle.gridX,
            targetY: isScattered ?
              padding + Math.random() * (SVG_HEIGHT - padding * 2) :
              particle.gridY,
            isScattered
          };
        });
      });
    };
  
    useEffect(() => {
      setParticles(initializeParticles());
      
      const interval = setInterval(toggleScatter, 4000);
      animationRef.current = requestAnimationFrame(updateParticles);
      
      return () => {
        clearInterval(interval);
        cancelAnimationFrame(animationRef.current);
      };
    }, []);
  
    return (
      <svg 
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} 
        className="w-full h-full" 
        preserveAspectRatio="xMidYMid meet"
      >
        {particles.map((particle, index) => (
          <g 
            key={`${skills[index].name}-${index}`}
            transform={`translate(${particle.x - ICON_SIZE/2}, ${particle.y - ICON_SIZE/2})`}
          >
            <image
              href={skills[index].icon}
              width={ICON_SIZE}
              height={ICON_SIZE}
              preserveAspectRatio="xMidYMid meet"
            />
          </g>
        ))}
      </svg>
    );
  };