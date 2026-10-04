import { useScrollReveal } from '../../hooks/useScrollReveal';
import './About.css';

export default function About() {
  const [sectionRef, isVisible] = useScrollReveal();

  const details = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5" />
        </svg>
      ),
      label: 'Course',
      value: 'Computer Science Engineering — 2nd Year',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          <path d="M9 22V12h6v10" />
        </svg>
      ),
      label: 'Institution',
      value: 'Christian College of Engineering and Technology',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      label: 'Location',
      value: 'Oddanchatram, Dindigul, India',
    },
  ];

  const languages = [
    { name: 'Tamil', level: 'Fluent', percent: 95 },
    { name: 'English', level: 'Fluent', percent: 90 },
    { name: 'Hindi', level: 'Basic conversation', percent: 35 },
    { name: 'Malayalam', level: 'Basic conversation', percent: 30 },
    { name: 'German', level: 'Learning', percent: 15 },
  ];

  return (
    <section id="about" className="about" aria-label="About me">
      <div className="container">
        <div ref={sectionRef} className={`reveal ${isVisible ? 'revealed' : ''}`}>
          <p className="section-label">About</p>
          <h2 className="section-title">Get to know me</h2>

          <div className="about__grid">
            {/* Profile Info */}
            <div className="about__info">
              <p className="about__bio">
                I'm a Computer Science Engineering student driven by curiosity and a
                passion for creating impactful digital experiences. I enjoy exploring
                modern web technologies, contributing to real-world projects, and
                constantly expanding my skill set.
              </p>

              <div className="about__details">
                {details.map((item, i) => (
                  <div
                    key={item.label}
                    className={`about__detail reveal ${isVisible ? 'revealed' : ''}`}
                    style={{ transitionDelay: `${0.15 + i * 0.1}s` }}
                  >
                    <div className="about__detail-icon">{item.icon}</div>
                    <div>
                      <span className="about__detail-label">{item.label}</span>
                      <span className="about__detail-value">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="about__languages">
              <h3 className="about__subtitle">Languages</h3>
              <div className="about__lang-list">
                {languages.map((lang, i) => (
                  <div
                    key={lang.name}
                    className={`about__lang reveal ${isVisible ? 'revealed' : ''}`}
                    style={{ transitionDelay: `${0.3 + i * 0.08}s` }}
                  >
                    <div className="about__lang-header">
                      <span className="about__lang-name">{lang.name}</span>
                      <span className="about__lang-level">{lang.level}</span>
                    </div>
                    <div className="about__lang-bar">
                      <div
                        className="about__lang-fill"
                        style={{
                          width: isVisible ? `${lang.percent}%` : '0%',
                          transitionDelay: `${0.5 + i * 0.1}s`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
