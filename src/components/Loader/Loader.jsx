import { useState, useEffect } from 'react';
import './Loader.css';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Simulate loading progress with realistic curve
    let frame;
    let start = null;
    const duration = 2400;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const t = Math.min(elapsed / duration, 1);

      // Ease-out cubic for natural feel
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));

      if (t < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        // Fade out after completing
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 600);
        }, 300);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [onComplete]);

  return (
    <div className={`loader ${fadeOut ? 'loader--fade-out' : ''}`} role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
      <div className="loader__content">
        <div className="loader__name">VS</div>
        <div className="loader__bar-container">
          <div className="loader__bar" style={{ width: `${progress}%` }} />
        </div>
        <div className="loader__percent">{progress}%</div>
      </div>
    </div>
  );
}
