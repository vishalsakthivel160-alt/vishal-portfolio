import { useState, useEffect, useCallback } from 'react';
import './Navbar.css';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section
      const sections = NAV_ITEMS.map((item) => {
        const el = document.getElementById(item.id);
        if (!el) return { id: item.id, top: Infinity };
        const rect = el.getBoundingClientRect();
        return { id: item.id, top: Math.abs(rect.top - 100) };
      });

      const closest = sections.reduce((a, b) => (a.top < b.top ? a : b));
      setActiveSection(closest.id);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = useCallback((id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="navbar__inner container">
        <a
          href="#home"
          className="navbar__logo"
          onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
          aria-label="Go to home"
        >
          VS<span className="navbar__logo-dot">.</span>
        </a>

        {/* Desktop Nav */}
        <ul className="navbar__links" role="menubar">
          {NAV_ITEMS.map((item) => (
            <li key={item.id} role="none">
              <a
                href={`#${item.id}`}
                role="menuitem"
                className={`navbar__link ${activeSection === item.id ? 'navbar__link--active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className={`navbar__burger ${mobileMenuOpen ? 'navbar__burger--open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${mobileMenuOpen ? 'navbar__mobile--open' : ''}`}>
        <ul className="navbar__mobile-links">
          {NAV_ITEMS.map((item, i) => (
            <li key={item.id} style={{ transitionDelay: `${i * 0.05}s` }}>
              <a
                href={`#${item.id}`}
                className={`navbar__mobile-link ${activeSection === item.id ? 'navbar__mobile-link--active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
