import { useState } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Skills.css';

const SKILLS = [
  {
    name: 'HTML',
    category: 'frontend',
    icon: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M5 3l2.27 24L16 30l8.73-3L27 3H5z" fill="#E44D26"/>
        <path d="M16 27.54l5.82-1.61L23.72 6H16v21.54z" fill="#F16529"/>
        <path d="M12.18 13.05H16V10H8.82l.78 8h6.4v-3.05h-3.42l-.4-1.95z" fill="#EBEBEB"/>
        <path d="M16 20.48l-.04.01-3.01-.81-.19-2.18H9.62l.38 4.23L16 23.5v-3.02z" fill="#EBEBEB"/>
        <path d="M16 13.05v3.05h3.23l-.31 3.35-2.92.79v3.02l5.34-1.48.04-.46.61-6.84.07-.72.15-1.71H16z" fill="#fff"/>
      </svg>
    ),
  },
  {
    name: 'CSS',
    category: 'frontend',
    icon: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M5 3l2.27 24L16 30l8.73-3L27 3H5z" fill="#1572B6"/>
        <path d="M16 27.54l5.82-1.61L23.72 6H16v21.54z" fill="#33A9DC"/>
        <path d="M16 13.05h-3.42l-.23-2.6H16V7.4H8.82l.06.7.62 6.95H16v-2z" fill="#EBEBEB"/>
        <path d="M16 20.45l-.04.01-2.88-.78-.18-2.08H9.76l.36 4.03 5.84 1.62.04-.01v-2.79z" fill="#EBEBEB"/>
        <path d="M16 13.05v2h3.06l-.29 3.2-2.77.75v2.79l5.08-1.41.04-.43.58-6.49.06-.7.12-1.36H16v2.65h4.73l-.15 1.79H16z" fill="#fff"/>
      </svg>
    ),
  },
  {
    name: 'JavaScript',
    category: 'frontend',
    icon: (
      <svg viewBox="0 0 32 32" fill="none">
        <rect x="2" y="2" width="28" height="28" rx="2" fill="#F7DF1E"/>
        <path d="M19.78 22.92c.57.93 1.31 1.61 2.62 1.61 1.1 0 1.8-.55 1.8-1.31 0-.91-.72-1.23-1.93-1.76l-.66-.28c-1.91-.81-3.18-1.83-3.18-3.98 0-1.98 1.51-3.49 3.87-3.49 1.68 0 2.89.59 3.76 2.12l-2.06 1.32c-.45-.81-.94-1.13-1.7-1.13-.77 0-1.26.49-1.26 1.13 0 .79.49 1.11 1.62 1.6l.66.28c2.25.97 3.52 1.95 3.52 4.17 0 2.39-1.88 3.7-4.4 3.7-2.47 0-4.06-1.18-4.84-2.72l2.18-1.26zM9.3 23.1c.42.74.8 1.37 1.72 1.37.88 0 1.43-.34 1.43-1.68V14.1h2.69v8.73c0 2.77-1.62 4.03-3.99 4.03-2.14 0-3.38-1.11-4.01-2.44L9.3 23.1z" fill="#323330"/>
      </svg>
    ),
  },
  {
    name: 'React',
    category: 'frontend',
    icon: (
      <svg viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="2.5" fill="#61DAFB"/>
        <ellipse cx="16" cy="16" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1" fill="none"/>
        <ellipse cx="16" cy="16" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1" fill="none" transform="rotate(60 16 16)"/>
        <ellipse cx="16" cy="16" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1" fill="none" transform="rotate(120 16 16)"/>
      </svg>
    ),
  },
  {
    name: 'Node.js',
    category: 'backend',
    icon: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M16 2.5L28 9.5v14L16 30.5 4 23.5v-14L16 2.5z" fill="#339933"/>
        <path d="M16 2.5v28L4 23.5v-14L16 2.5z" fill="#66CC33" opacity="0.5"/>
        <text x="9" y="20" fill="#fff" fontSize="10" fontWeight="bold" fontFamily="sans-serif">N</text>
      </svg>
    ),
  },
  {
    name: 'Python',
    category: 'backend',
    icon: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M15.89 3c-7.18 0-6.73 3.11-6.73 3.11l.01 3.22h6.85v.97H7.37S3 9.82 3 17.06s3.82 7 3.82 7h2.28v-3.37s-.12-3.82 3.76-3.82h6.48s3.64.06 3.64-3.52V7.14S23.73 3 15.89 3zm-3.83 2.39a1.18 1.18 0 110 2.36 1.18 1.18 0 010-2.36z" fill="#3776AB"/>
        <path d="M16.11 29c7.18 0 6.73-3.11 6.73-3.11l-.01-3.22h-6.85v-.97h8.65S29 22.18 29 14.94s-3.82-7-3.82-7h-2.28v3.37s.12 3.82-3.76 3.82H12.66S9.02 15.07 9.02 18.65v6.21S8.27 29 16.11 29zm3.83-2.39a1.18 1.18 0 110-2.36 1.18 1.18 0 010 2.36z" fill="#FFD43B"/>
      </svg>
    ),
  },
  {
    name: 'Git',
    category: 'tools',
    icon: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M29.47 14.73L17.27 2.53a1.8 1.8 0 00-2.54 0l-2.53 2.53 3.21 3.21a2.13 2.13 0 012.7 2.72l3.09 3.09a2.14 2.14 0 11-1.28 1.18l-2.88-2.88v7.57a2.14 2.14 0 11-1.76-.09V13.1a2.14 2.14 0 01-1.16-2.8L10.96 7.1 2.53 15.53a1.8 1.8 0 000 2.54l12.2 12.2a1.8 1.8 0 002.54 0l12.2-12.2a1.8 1.8 0 000-2.54z" fill="#F05032"/>
      </svg>
    ),
  },
  {
    name: 'GitHub',
    category: 'tools',
    icon: (
      <svg viewBox="0 0 32 32" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M16 3C8.82 3 3 8.82 3 16c0 5.74 3.72 10.61 8.89 12.32.65.12.89-.28.89-.63v-2.2c-3.61.78-4.37-1.74-4.37-1.74-.59-1.5-1.44-1.9-1.44-1.9-1.18-.81.09-.79.09-.79 1.3.09 1.99 1.34 1.99 1.34 1.16 1.99 3.04 1.41 3.78 1.08.12-.84.45-1.41.82-1.74-2.88-.33-5.91-1.44-5.91-6.42 0-1.42.51-2.58 1.34-3.49-.13-.33-.58-1.65.13-3.44 0 0 1.09-.35 3.57 1.33a12.4 12.4 0 016.5 0c2.48-1.68 3.57-1.33 3.57-1.33.71 1.79.26 3.11.13 3.44.83.91 1.34 2.07 1.34 3.49 0 5-3.04 6.08-5.93 6.4.47.4.88 1.2.88 2.42v3.58c0 .35.24.76.9.63A13.01 13.01 0 0029 16c0-7.18-5.82-13-13-13z" fill="#f0f0f5"/>
      </svg>
    ),
  },
  {
    name: 'npm',
    category: 'tools',
    icon: (
      <svg viewBox="0 0 32 32" fill="none">
        <rect x="2" y="8" width="28" height="16" fill="#CB3837"/>
        <path d="M5.6 11.6h20.8v8.8h-10.4v1.6H12.8v-1.6H5.6v-8.8zm3.2 7.2h1.6v-4h1.6v4h1.6v-5.6H8.8v5.6zm6.4-5.6v7.2h3.2v-1.6h3.2v-5.6h-6.4zm3.2 4h-1.6v-2.4h1.6v2.4zm3.2-4v5.6h1.6v-4h1.6v4h1.6v-5.6h-4.8z" fill="#fff"/>
      </svg>
    ),
  },
  {
    name: 'MS Office',
    category: 'tools',
    icon: (
      <svg viewBox="0 0 32 32" fill="none">
        <rect x="4" y="4" width="24" height="24" rx="3" fill="#D83B01"/>
        <path d="M8 10h6v2H8v-2zm0 4h10v2H8v-2zm0 4h8v2H8v-2z" fill="#fff" opacity="0.9"/>
        <rect x="20" y="8" width="4" height="16" rx="1" fill="#fff" opacity="0.4"/>
      </svg>
    ),
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'tools', label: 'Tools' },
];

export default function Skills() {
  const [sectionRef, isVisible] = useScrollReveal();
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredSkills =
    activeCategory === 'all'
      ? SKILLS
      : SKILLS.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="skills" aria-label="Skills">
      <div className="container">
        <div ref={sectionRef} className={`reveal ${isVisible ? 'revealed' : ''}`}>
          <p className="section-label">Skills</p>
          <h2 className="section-title">Technologies I work with</h2>

          {/* Category Filter */}
          <div className="skills__filters" role="tablist" aria-label="Filter skills by category">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={`skills__filter ${activeCategory === cat.id ? 'skills__filter--active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="skills__grid" role="tabpanel">
            {filteredSkills.map((skill, i) => (
              <div
                key={skill.name}
                className={`skills__card reveal ${isVisible ? 'revealed' : ''}`}
                style={{ transitionDelay: `${0.1 + i * 0.05}s` }}
              >
                <div className="skills__card-icon">{skill.icon}</div>
                <span className="skills__card-name">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
