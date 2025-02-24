import taskManager from "./imgs_demo/task-management-dashboard.png";
import rmax from "./imgs_demo/rmax-website.png";
import workflowCanvas from "./imgs_demo/workflow-canvas.png";
export const projects = [
  {
    name: "Task-Management-Dashboard",
    image: taskManager,
    description: `Modern task management web application using React, Redux, and TailwindCSS with features like
authentication, dashboard analytics, and real-time task tracking integrated with Appwrite backend services.`,
    githubLink: "https://github.com/KartikDhar09/task-management-dashboard",
    liveLink: "https://task-management-dashboard-amber-six.vercel.app",
   technologies: ['React', 'Redux', 'Redux Thunk', 'React Context API', 'Tailwind CSS', 'Recharts',
    'Appwrite', 'Git', 'Github', 'Responsive Design']

  },
  {
    name: "Rmax-Website",
    image: rmax,
    description: `Modern React web application with advanced UI components, form validation, and multi-page routing
using TailwindCSS, React Router, and shadcn/ui components.`,
    githubLink: "https://github.com/KartikDhar09/RMax-SaaS-Platform-Website",
    liveLink: "https://rmax-saas-platform.netlify.app/",
    technologies: [ 'React', 'Tailwind CSS',' React Router', 'React Hook Form', 'Git', 'Github', 'Responsive Design']

  },
  {
    name: "Workflow-Canvas",
    image: workflowCanvas,
    description: `React-based interactive workflow editor for creating, visualizing and managing flowcharts with
drag-and-drop nodes and modern UI components.`,
    githubLink: "https://github.com/KartikDhar09/workflow-canvas",
    liveLink: "https://workflow-canvas.vercel.app/",
    technologies: [ 'React' , 'Tailwind CSS', 'Redux', 'ReactFlow' , 'Shadcn/ui', 'Git', 'Github']

  },
];
