import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Projects.css';

/**
 * Project data — keep this array easy to edit for adding future projects.
 * Each project can have: title, description, tags, liveUrl, repoUrl, image.
 */
const PROJECTS = [
  {
    id: 'teacher-period-assistant',
    title: 'Teacher Period Assistant',
    description:
      'A practical tool designed to help teachers manage and organize class periods efficiently. Built to solve a real-world scheduling challenge in educational institutions.',
    tags: ['Web App', 'Productivity', 'Education'],
    // Add URLs when available:
    liveUrl: null,
    repoUrl: null,
  },
  // ──────────────────────────────────────────
  // Add more projects here. Example:
  // {
  //   id: 'project-slug',
  //   title: 'Project Name',
  //   description: 'Short description of the project.',
  //   tags: ['React', 'Node.js'],
  //   liveUrl: 'https://...',
  //   repoUrl: 'https://github.com/...',
  // },
  // ──────────────────────────────────────────
];

export default function Projects() {
  const [sectionRef, isVisible] = useScrollReveal();

  return (
    <section id="projects" className="projects" aria-label="Projects">
      <div className="container">
        <div ref={sectionRef} className={`reveal ${isVisible ? 'revealed' : ''}`}>
          <p className="section-label">Projects</p>
          <h2 className="section-title">Things I've built</h2>

          <div className="projects__grid">
            {PROJECTS.map((project, i) => (
              <article
                key={project.id}
                className={`projects__card reveal ${isVisible ? 'revealed' : ''}`}
                style={{ transitionDelay: `${0.15 + i * 0.1}s` }}
              >
                {/* Top accent bar */}
                <div className="projects__card-accent" />

                <div className="projects__card-content">
                  {/* Folder icon */}
                  <div className="projects__card-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
                    </svg>
                  </div>

                  <h3 className="projects__card-title">{project.title}</h3>
                  <p className="projects__card-desc">{project.description}</p>

                  {/* Tags */}
                  <div className="projects__card-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="projects__card-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  {(project.liveUrl || project.repoUrl) && (
                    <div className="projects__card-links">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="projects__card-link"
                          aria-label={`View ${project.title} live`}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                          </svg>
                          Live
                        </a>
                      )}
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="projects__card-link"
                          aria-label={`View ${project.title} source code`}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
                          </svg>
                          Code
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </article>
            ))}

            {/* Placeholder for future projects */}
            {PROJECTS.length < 3 && (
              <div className="projects__card projects__card--placeholder">
                <div className="projects__card-content">
                  <div className="projects__card-icon projects__card-icon--muted">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 8v8M8 12h8" />
                    </svg>
                  </div>
                  <p className="projects__card-placeholder-text">More projects coming soon</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
