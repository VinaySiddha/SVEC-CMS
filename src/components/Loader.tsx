import React, { useState, useEffect } from 'react';
import vasaviLogo from '../assets/vasavi_logo.png';

interface LoaderProps {
  onLoadingComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onLoadingComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [animationPhase, setAnimationPhase] = useState<'floating' | 'merging' | 'complete'>('floating');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Phase 1: Floating animation (2.5 seconds)
    const floatingTimer = setTimeout(() => {
      setAnimationPhase('merging');
    }, 2500);

    // Phase 2: Merging animation (1.5 seconds)
    const mergingTimer = setTimeout(() => {
      setAnimationPhase('complete');
    }, 4000);

    // Phase 3: Fade out and complete (0.8 seconds)
    const completeTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onLoadingComplete();
      }, 800);
    }, 4800);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(floatingTimer);
      clearTimeout(mergingTimer);
      clearTimeout(completeTimer);
    };
  }, [onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div className={`loader-container ${animationPhase === 'complete' ? 'fade-out' : ''}`}>
      {/* Animated background */}
      <div className="loader-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        
        {/* Particle effects */}
        <div className="particles">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className={`particle particle-${i + 1}`}></div>
          ))}
        </div>
      </div>

      {/* Main loader content */}
      <div className="loader-content">
        {/* Logo assembly animation */}
        <div className="logo-assembly">
          {/* Left Section */}
          <div className={`logo-part left-section ${animationPhase}`}>
            <img 
              src={vasaviLogo} 
              alt="Left Section"
              style={{
                clipPath: 'polygon(0% 0%, 33% 0%, 33% 100%, 0% 100%)',
                filter: 'brightness(1.2) contrast(1.1) hue-rotate(10deg)'
              }}
            />
            <div className="part-glow glow-left"></div>
          </div>

          {/* Center Section */}
          <div className={`logo-part center-section ${animationPhase}`}>
            <img 
              src={vasaviLogo} 
              alt="Center Section"
              style={{
                clipPath: 'polygon(33% 0%, 67% 0%, 67% 100%, 33% 100%)',
                filter: 'brightness(1.1) contrast(1.05) saturate(1.2)'
              }}
            />
            <div className="part-glow glow-center"></div>
          </div>

          {/* Right Section */}
          <div className={`logo-part right-section ${animationPhase}`}>
            <img 
              src={vasaviLogo} 
              alt="Right Section"
              style={{
                clipPath: 'polygon(67% 0%, 100% 0%, 100% 100%, 67% 100%)',
                filter: 'brightness(1.15) contrast(1.08) hue-rotate(-10deg)'
              }}
            />
            <div className="part-glow glow-right"></div>
          </div>

          {/* Assembly completion glow */}
          <div className={`assembly-glow ${animationPhase === 'merging' ? 'active' : ''}`}></div>
          
          {/* Connecting energy lines */}
          <div className={`energy-lines ${animationPhase === 'merging' ? 'active' : ''}`}>
            <div className="energy-line line-1"></div>
            <div className="energy-line line-2"></div>
            <div className="energy-line line-3"></div>
          </div>
        </div>

        {/* Loading text with typing effect */}
        <div className="loading-text">
          <h2 className="typing-text">Assembling Sri Vasavi Excellence</h2>
          <div className="typing-cursor"></div>
        </div>

        {/* Progress indicator */}
        <div className="progress-container">
          <div className="progress-ring">
            <svg width="120" height="120" className="progress-svg">
              <defs>
                <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#DC143C" />
                  <stop offset="50%" stopColor="#FFD700" />
                  <stop offset="100%" stopColor="#4A90E2" />
                </linearGradient>
              </defs>
              <circle
                cx="60"
                cy="60"
                r="54"
                className="progress-circle-bg"
              />
              <circle
                cx="60"
                cy="60"
                r="54"
                className="progress-circle"
                style={{
                  strokeDasharray: `${339.292}`,
                  strokeDashoffset: `${339.292 - (progress / 100) * 339.292}`
                }}
              />
            </svg>
            <div className="progress-text">{Math.round(progress)}%</div>
          </div>
        </div>

        {/* Spark effects */}
        <div className="spark-container">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className={`spark spark-${i + 1}`}></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loader;
