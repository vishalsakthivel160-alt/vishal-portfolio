import { useState } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Contact.css';

const CONTACT_INFO = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <path d="M22 6l-10 7L2 6"/>
      </svg>
    ),
    label: 'Email',
    value: 'vishalsakthivel160@gmail.com',
    href: 'mailto:vishalsakthivel160@gmail.com',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
    label: 'Phone',
    value: '+91 7094556516',
    href: 'tel:+917094556516',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: 'Location',
    value: 'Dindigul, India',
    href: null,
  },
];

export default function Contact() {
  const [sectionRef, isVisible] = useScrollReveal();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formState.name || !formState.email || !formState.message) {
      setErrorMessage('Please fill in all fields.');
      setStatus('error');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setStatus('sent');
        setFormState({ name: '', email: '', message: '' });
      } else {
        setErrorMessage(data.error || 'Failed to send message.');
        setStatus('error');
      }
    } catch (err) {
      setErrorMessage('Network error. Please try again later.');
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="contact" aria-label="Contact">
      <div className="container">
        <div ref={sectionRef} className={`reveal ${isVisible ? 'revealed' : ''}`}>
          <p className="section-label">Contact</p>
          <h2 className="section-title">Get in touch</h2>

          <div className="contact__grid">
            {/* Contact Info */}
            <div className="contact__info">
              <p className="contact__info-text">
                Have a question or want to work together? Feel free to reach out.
                I'm always open to discussing new projects and opportunities.
              </p>

              <div className="contact__info-list">
                {CONTACT_INFO.map((item, i) => (
                  <div
                    key={item.label}
                    className={`contact__info-item reveal ${isVisible ? 'revealed' : ''}`}
                    style={{ transitionDelay: `${0.2 + i * 0.1}s` }}
                  >
                    <div className="contact__info-icon">{item.icon}</div>
                    <div>
                      <span className="contact__info-label">{item.label}</span>
                      {item.href ? (
                        <a href={item.href} className="contact__info-value contact__info-link">
                          {item.value}
                        </a>
                      ) : (
                        <span className="contact__info-value">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <form
              className={`contact__form reveal ${isVisible ? 'revealed' : ''}`}
              style={{ transitionDelay: '0.3s' }}
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="contact__field">
                <label htmlFor="contact-name" className="contact__label">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  className="contact__input"
                />
              </div>

              <div className="contact__field">
                <label htmlFor="contact-email" className="contact__label">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  placeholder="your@email.com"
                  className="contact__input"
                />
              </div>

              <div className="contact__field">
                <label htmlFor="contact-message" className="contact__label">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="What would you like to say?"
                  className="contact__input contact__textarea"
                />
              </div>

              <button
                type="submit"
                className="contact__submit"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? (
                  <>Sending...</>
                ) : status === 'sent' ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    Message Sent!
                  </>
                ) : (
                  <>
                    Send Message
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                    </svg>
                  </>
                )}
              </button>

              {status === 'error' && (
                <p className="contact__error">
                  {errorMessage || 'Something went wrong. Please try again or email me directly.'}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
