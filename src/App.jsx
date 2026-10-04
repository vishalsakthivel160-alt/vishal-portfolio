import { useState, useCallback } from 'react';
import Loader from './components/Loader/Loader';
import Navbar from './components/Navbar/Navbar';
import HeroSection from './components/Hero/HeroSection';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Resume from './components/Resume/Resume';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import './App.css';

export default function App() {
  const [loading, setLoading] = useState(true);

  const handleLoaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading && <Loader onComplete={handleLoaderComplete} />}

      <div className={`app ${loading ? 'app--loading' : ''}`}>
        <Navbar />
        <main>
          <HeroSection />
          <About />
          <Skills />
          <Projects />
          <Resume />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
