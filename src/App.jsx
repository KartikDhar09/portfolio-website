import React from 'react';
import emailjs from '@emailjs/browser';
import { AppContent } from './AppContent.jsx';
emailjs.init(import.meta.env.VITE_PUBLIC_KEY);


function App() {
   return <AppContent />;
}

export default App;