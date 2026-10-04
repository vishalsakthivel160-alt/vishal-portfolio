import { useState, useEffect, useRef } from 'react';
import { useReducedMotion, useIsMobile } from '../../hooks/useScrollReveal';
import './HeroSection.css';

export default function HeroSection() {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [textVisible, setTextVisible] = useState(false);
  const videoRef = useRef(null);

  // Show text after character turn completes and folds arms (~8s in the new video)
  useEffect(() => {
    // We delay the text reveal until he folds his arms in the video
    const delay = reducedMotion ? 300 : 8000;
    const timer = setTimeout(() => setTextVisible(true), delay);
    return () => clearTimeout(timer);
  }, [reducedMotion]);

  const handleScrollToWork = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero" aria-label="Introduction">
      {/* Cinematic Video Background */}
      <div className="hero__video-container">
        <video 
          ref={videoRef}
          className="hero__video" 
          src="/hero-avatar.mp4" 
          autoPlay 
          muted 
          playsInline
        />
        
        {/* Dark overlay to seamlessly blend edges into the dark theme */}
        <div className="hero__video-overlay" />
      </div>

      {/* Text Overlay */}
      <div className={`hero__content ${textVisible ? 'hero__content--visible' : ''}`}>
        <div className="hero__text-group">
          <p className="hero__greeting">Hello, I'm</p>
          <h1 className="hero__name">
            Vishal Sakthivel<span className="hero__name-accent"> R</span>
          </h1>
          <p className="hero__title">Computer Science Engineering Student & Developer</p>
          <p className="hero__description">
            Computer Science Engineering student passionate about building modern
            web experiences, learning new technologies, and turning ideas into
            real-world projects.
          </p>

          <div className="hero__cta">
            <button
              className="hero__btn hero__btn--primary"
              onClick={handleScrollToWork}
              aria-label="View my work"
            >
              <span>View My Work</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <a
              href="/resume.pdf"
              download
              className="hero__btn hero__btn--secondary"
              aria-label="Download resume"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 10v3a1 1 0 001 1h10a1 1 0 001-1v-3M8 2v9M5 8l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={`hero__scroll-indicator ${textVisible ? 'hero__scroll-indicator--visible' : ''}`}>
        <div className="hero__scroll-line">
          <div className="hero__scroll-dot" />
        </div>
        <span className="hero__scroll-text">Scroll</span>
      </div>

      {/* Bottom gradient fade into next section */}
      <div className="hero__gradient-bottom" />
    </section>
  );
}
