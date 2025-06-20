
import React, { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import Image from 'next/image';
import styles from './gmicon.module.css';


interface GmIconProps {
  showOnDesktop?: boolean;
}

const GmIcon: React.FC<GmIconProps> = ({ showOnDesktop = false }) => {
  const { theme } = useTheme();
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const iconRef = useRef<HTMLDivElement | null>(null);

  const handleIconClick = useCallback(() => {
    window.location.href = '/'; // Go to Megicode home page
  }, []);

  const iconClass = useMemo(() => {
    return `${styles['theme-toggle-icon']} ${isInView ? styles.animate : ''} ${theme === 'light' ? styles.light : styles.dark}`;
  }, [theme, isInView, styles]);

  const iconSrc = useMemo(() => {
    return "/megicode-logo-alt.svg";
  }, []);

  const checkInView = () => {
    if (iconRef.current && !hasAnimated) {
      const rect = iconRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const isVisible = (rect.top <= windowHeight) && (rect.bottom >= 0);
      if (isVisible) {
        setIsInView(true);
        setHasAnimated(true);
        setTimeout(() => setIsInView(false), 1000); // Match duration of the animation
      }
    }
  };

  useEffect(() => {
    // Only show on mobile screens unless showOnDesktop is true
    const isMobile = () => window.matchMedia('(max-width: 768px)').matches;
    if (!showOnDesktop && !isMobile()) return;

    // Initial check
    checkInView();

    // Add scroll event listener
    window.addEventListener('scroll', checkInView);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('scroll', checkInView);
    };
  }, [hasAnimated, showOnDesktop]);

  // Only render on mobile screens unless showOnDesktop is true
  const isMobile = typeof window !== 'undefined' ? window.matchMedia('(max-width: 768px)').matches : false;
  if (!showOnDesktop && !isMobile) return null;

  return (
    <div
      className={iconClass}
      onClick={handleIconClick}
      role="button"
      aria-label="Toggle Theme and Navigate to Megicode"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleIconClick();
        }
      }}
      ref={iconRef}
    >
      <Image src={iconSrc} alt="Megicode Logo Icon" width={28} height={28} />
    </div>
  );
};

export default GmIcon;
