import React, { useRef, useEffect } from 'react';
import './HeroSection.css'; // Reusing hero classes for positioning

export default function ChromaKeyVideo({ src }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    let animationFrameId;

    const processFrame = () => {
      if (video.paused || video.ended) {
        animationFrameId = requestAnimationFrame(processFrame);
        return;
      }

      // Ensure canvas matches video dimensions
      if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }

      if (video.videoWidth > 0 && video.videoHeight > 0) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const length = data.length;

        // Chromakey logic to remove the blue curtain
        for (let i = 0; i < length; i += 4) {
          const r = data[i + 0];
          const g = data[i + 1];
          const b = data[i + 2];

          // The blue curtain is roughly R:90, G:120, B:160.
          // The suit is dark navy (B < 60).
          // Skin is brown (R > B).
          // Shirt is white/gray.
          
          if (b > r + 15 && g > r + 5 && b > 70) {
            // It's the curtain! Make it transparent.
            // Calculate how "blue" it is compared to the threshold to soften edges
            const blueFactor = b - Math.max(r, g);
            if (blueFactor > 25) {
              data[i + 3] = 0; // Completely transparent
            } else {
              // Semi-transparent for anti-aliased edges
              data[i + 3] = Math.max(0, 255 - (blueFactor * 10));
            }
          }
        }
        
        ctx.putImageData(imageData, 0, 0);
      }
      
      animationFrameId = requestAnimationFrame(processFrame);
    };

    video.addEventListener('play', () => {
      processFrame();
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        playsInline
        style={{ 
          position: 'absolute', 
          opacity: 0, 
          pointerEvents: 'none', 
          width: '1px', 
          height: '1px' 
        }} 
      />
      <canvas
        ref={canvasRef}
        className="hero__video" // Apply the same positioning classes
      />
    </>
  );
}
