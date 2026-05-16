import React from 'react';
import { trainerProfile } from '../../data/trainer';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { Card } from '../common/Card';
import { CTAButton } from '../common/CTAButton';
import { MessageCircle, Phone, AtSign as Instagram, MapPin, Clock } from 'lucide-react';
import styles from './ContactSection.module.css';

export const ContactSection: React.FC = () => {
  const formattedOperatingHours = trainerProfile.operatingHours.split(' / ').join('\n');

  return (
    <section className={styles.section} id="contact">
      <Container>
        <SectionHeading 
          title="Ready to Start?" 
          subtitle="망설이지 말고 지금 바로 상담을 신청하세요. 첫 걸음이 가장 중요합니다." 
        />
        
        <div className={styles.grid}>
          <Card className={styles.contactCard}>
            <h3 className={styles.cardTitle}>Contact Info</h3>
            <p className={styles.cardDesc}>편하신 방법으로 연락주시면 친절하게 상담해 드립니다.</p>
            
            <ul className={styles.contactList}>
              <li>
                <Phone className={styles.icon} size={20} />
                <a href={`tel:${trainerProfile.phone.replace(/-/g, '')}`} style={{ textDecoration: 'underline', color: 'inherit' }}>
                  {trainerProfile.phone}
                </a>
              </li>
              <li>
                <Instagram className={styles.icon} size={20} />
                <a href={trainerProfile.instagram} target="_blank" rel="noreferrer" style={{ textDecoration: 'underline' }}>
                  인스타그램 방문하기
                </a>
              </li>
              <li>
                <MapPin className={styles.icon} size={20} />
                <span>
                  <strong>{trainerProfile.location}</strong>
                  <small className={styles.address}>{trainerProfile.address}</small>
                </span>
              </li>
              <li style={{ alignItems: 'flex-start' }}>
                <Clock className={styles.icon} size={20} style={{ marginTop: '2px' }} />
                <span style={{ whiteSpace: 'pre-line', lineHeight: '1.5' }}>
                  {formattedOperatingHours}
                </span>
              </li>
            </ul>

            <div className={styles.buttons}>
              <CTAButton href={`tel:${trainerProfile.phone.replace(/-/g, '')}`} fullWidth variant="primary">
                전화로 문의하기
              </CTAButton>
              <CTAButton href={trainerProfile.kakaoTalk} target="_blank" rel="noreferrer" fullWidth variant="secondary">
                <MessageCircle size={18} style={{ marginRight: '8px' }} />
                카카오톡 문의
              </CTAButton>
              <CTAButton href={trainerProfile.mapUrl} target="_blank" rel="noreferrer" fullWidth variant="outline">
                <MapPin size={18} style={{ marginRight: '8px' }} />
                네이버 지도에서 보기
              </CTAButton>
            </div>
          </Card>
          
          <div className={styles.mapCard}>
            <div className={styles.mapContainer} style={{ width: '100%', height: '100%', minHeight: '300px', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              <iframe 
                src={trainerProfile.mapEmbedUrl}
                width="100%" 
                height="100%" 
                style={{ border: 0, minHeight: '350px' }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title={`${trainerProfile.location} 위치`}
              ></iframe>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
