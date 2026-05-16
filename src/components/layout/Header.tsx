import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { navigationItems, trainerProfile } from '../../data/trainer';
import { CTAButton } from '../common/CTAButton';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <a href="#" className={styles.logo}>
          {trainerProfile.name} <span>PT</span>
        </a>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav}>
          <ul className={styles.navList}>
            {navigationItems.map((item) => (
              <li key={item.name}>
                <a href={item.href} className={styles.navLink}>{item.name}</a>
              </li>
            ))}
          </ul>
          <CTAButton href="#contact" variant="primary" size="sm">
            무료 상담
          </CTAButton>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className={styles.mobileToggle} 
          onClick={toggleMenu}
          aria-expanded={isMobileMenuOpen}
          aria-label="메뉴 열기"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.mobileNavOpen : ''}`}>
        <ul className={styles.mobileNavList}>
          {navigationItems.map((item) => (
            <li key={item.name}>
              <a 
                href={item.href} 
                className={styles.mobileNavLink}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            </li>
          ))}
          <li>
            <CTAButton 
              href="#contact" 
              variant="primary" 
              fullWidth 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              무료 상담 신청
            </CTAButton>
          </li>
        </ul>
      </div>
    </header>
  );
};
