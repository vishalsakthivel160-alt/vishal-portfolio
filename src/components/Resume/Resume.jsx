import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Resume.css';

export default function Resume() {
  const [sectionRef, isVisible] = useScrollReveal();

  return (
    <section id="resume" className="resume" aria-label="Resume">
      <div className="container">
        <div ref={sectionRef} className={`reveal ${isVisible ? 'revealed' : ''}`}>
          <p className="section-label">Resume</p>
          <h2 className="section-title">My Resume</h2>

          <div className="resume__card">
            <div className="resume__card-inner">
              {/* Document icon */}
              <div className="resume__icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M28 6H14a4 4 0 00-4 4v28a4 4 0 004 4h20a4 4 0 004-4V16l-10-10z" />
                  <path d="M28 6v10h10" />
                  <path d="M18 26h12M18 32h8" />
                </svg>
              </div>

              <h3 className="resume__heading">Vishal Sakthivel R</h3>
              <p className="resume__subtext">
                Computer Science Engineering — 2nd Year
              </p>
              <p className="resume__description">
                Download my resume to learn more about my education, skills, and experience.
              </p>

              {/* Single resume action — replace /resume.pdf with your file */}
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '24px' }}>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume__download-btn"
                  aria-label="View resume as PDF"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  View Resume
                </a>

                <a
                  href="/resume.pdf"
                  download
                  className="resume__download-btn"
                  style={{ background: 'transparent', border: '1px solid var(--accent)', color: 'var(--accent)' }}
                  aria-label="Download resume as PDF"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                  </svg>
                  Download
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
