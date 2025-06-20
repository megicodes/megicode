"use client";
import React, { Suspense } from "react";
import { useTheme } from "../../context/ThemeContext";
import dynamic from 'next/dynamic';
import Loading from '../loading';

// Static imports for critical components
import NavBarDesktop from "../../components/NavBar_Desktop_Company/nav-bar-Company";
import NavBarMobile from "../../components/NavBar_Mobile/NavBar-mobile";
import ThemeToggleIcon from "../../components/Icon/sbicon";
import AboutHero from "../../components/AboutHero/AboutHero";

// Component interfaces
interface FooterProps {
  linkedinUrl: string;
  instagramUrl: string;
  githubUrl: string;
  copyrightText: string;
}

// Dynamic imports for non-critical components with proper typing
const AboutIntro = dynamic<{}>(
  () => import("../../components/AboutIntro/AboutIntro").then(mod => mod.default), {
  loading: () => <Loading />
});
const CoreValues = dynamic<{}>(
  () => import("../../components/CoreValues/CoreValues").then(mod => mod.default), {
  loading: () => <Loading />
});
const AboutFounder = dynamic<{}>(
  () => import("../../components/AboutFounder/AboutFounder").then(mod => mod.default), {
  loading: () => <Loading />
});
const AboutStats = dynamic<{}>(
  () => import("../../components/AboutStats/AboutStats").then(mod => mod.default), {
  loading: () => <Loading />
});
const Footer = dynamic<FooterProps>(
  () => import("../../components/Footer/Footer").then(mod => mod.default), {
  loading: () => <Loading />
});

export default function AboutPage() {
  const { theme } = useTheme();

  // Social/contact info
  const linkedinUrl = "https://www.linkedin.com/company/megicode";
  const instagramUrl = "https://www.instagram.com/megicode/";
  const githubUrl = "https://github.com/megicode";
  const copyrightText = "Copyright 2025 Megicode. All Rights Reserved.";

  const sections = [
    { label: "Home", route: "/" },
    { label: "About", route: "/about" },
    { label: "Services", route: "/services" },
    { label: "Reviews", route: "/reviews" },
    { label: "Project", route: "/project" },
    { label: "Contact", route: "/contact" },
  ];

  return (
    <div 
      style={{ 
        backgroundColor: theme === "dark" ? "#1d2127" : "#ffffff", 
        minHeight: "100vh", 
        overflowX: "hidden" 
      }}
    >
      {/* Theme Toggle Icon */}
      <div 
        id="theme-toggle" 
        role="button" 
        tabIndex={0} 
        aria-label="Toggle theme"
      >
        <ThemeToggleIcon />
      </div>

      {/* Navigation */}
      <header>
        {/* Desktop NavBar */}
        <nav 
          id="desktop-navbar" 
          aria-label="Main Navigation"
          className="hidden md:block"
        >
          <NavBarDesktop />
        </nav>

        {/* Mobile NavBar */}
        <nav 
          id="mobile-navbar" 
          aria-label="Mobile Navigation"
          className="block md:hidden"
        >
          <NavBarMobile />
        </nav>
      </header>

      {/* Main Content */}
      <main 
        style={{ 
          background: "var(--color-bg)", 
          color: "var(--color-text)" 
        }}
      >
        {/* Critical Path - Load Immediately */}
        <AboutHero />

        {/* Non-Critical Components - Load Dynamically */}
        <Suspense fallback={<Loading />}>
          {/* Introduction Section - Start with who we are */}
          <section aria-label="About Company">
            <AboutIntro />
          </section>

          {/* Founder Section - Move up for personal connection */}
          <section aria-label="About Founder">
            <AboutFounder />
          </section>

          {/* Stats Section - Show achievements after intro/founder */}
          <section aria-label="Company Statistics">
            <AboutStats />
          </section>

          {/* Core Values Section */}
          <section aria-label="Our Core Values">
            <CoreValues />
          </section>
        </Suspense>
      </main>

      {/* Footer */}
      <footer 
        id="footer-section" 
        aria-label="Footer" 
        style={{ width: "100%", overflow: "hidden" }}
      >
        <Suspense fallback={<Loading />}>
          <Footer
            linkedinUrl={linkedinUrl}
            instagramUrl={instagramUrl}
            githubUrl={githubUrl}
            copyrightText={copyrightText}
          />
        </Suspense>
      </footer>
    </div>
  );
}
