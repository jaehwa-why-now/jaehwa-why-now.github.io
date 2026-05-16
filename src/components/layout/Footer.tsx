import React from 'react';
import { trainerProfile } from '../../data/trainer';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const formattedOperatingHours = trainerProfile.operatingHours.split(' / ').join('\n');

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.info}>
            <h3 className={styles.logo}>{trainerProfile.name} <span>PT</span></h3>
            <p className={styles.description}>{trainerProfile.tagline}</p>
          </div>
          
          <div className={styles.links}>
            <h4 className={styles.title}>Contact</h4>
            <ul className={styles.list}>
              <li><a href={`tel:${trainerProfile.phone.replace(/-/g, '')}`}>{trainerProfile.phone}</a></li>
              <li><a href={trainerProfile.instagram} target="_blank" rel="noreferrer">Instagram</a></li>
            </ul>
          </div>
          
          <div className={styles.links}>
            <h4 className={styles.title}>Location</h4>
            <p className={styles.address}>
              <strong>{trainerProfile.location}</strong><br />
              {trainerProfile.address}
            </p>
            <p className={styles.hours} style={{ whiteSpace: 'pre-line', lineHeight: '1.5', marginTop: '0.5rem' }}>
              {formattedOperatingHours}
            </p>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p>&copy; {currentYear} {trainerProfile.name} PT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
