import React from 'react';
import { trainerProfile } from '../../data/trainer';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import styles from './AboutSection.module.css';
import { CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const specialties = [
    "다이어트 및 체지방 감량",
    "근력 향상 및 벌크업",
    "체형 교정 및 통증 케어",
    "바디프로필 준비",
    "초보자 맞춤 PT",
    "직장인 생활습관 개선"
  ];

  return (
    <section className="section" id="about">
      <Container>
        <SectionHeading
          title="About Trainer"
          subtitle="단순한 운동 지도를 넘어, 당신의 변화를 이끄는 러닝메이트"
        />

        <div className={styles.grid}>
          <div className={styles.imageColumn}>
            <div className={styles.imageWrapper}>
              <img src={trainerProfile.mainImage} alt="진(이재화) 트레이너" className={styles.trainerImage} />
            </div>
          </div>

          <div className={styles.contentColumn}>
            <h3 className={styles.name}>{trainerProfile.name} 트레이너</h3>
            <p className={styles.tagline}>{trainerProfile.tagline}</p>
            <p className={styles.description}>{trainerProfile.description}</p>

            <div className={styles.specialties}>
              <h4 className={styles.specialtyTitle}>전문 분야</h4>
              <ul className={styles.specialtyList}>
                {specialties.map((item, index) => (
                  <li key={index} className={styles.specialtyItem}>
                    <CheckCircle2 size={20} className={styles.icon} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.credentialsGrid}>
              <div className={styles.credentialBox}>
                <h4>Career (경력)</h4>
                <ul>
                  <li>(현) 에이블짐 구로디지털단지역점 팀장</li>
                  <li>(전) 에이블짐 구로디지털단지역점 트레이너</li>
                  <li>(전) 7공수여단 특전사 명예전역</li>
                  <li>(전) 워너짐 등촌점 트레이너</li>
                  <li>(전) 스포애니 암사역점 PT팀장</li>
                  <li>(전) 에이블짐 천호역점 트레이너</li>
                </ul>
              </div>

              <div className={styles.credentialBox}>
                <h4>Completion (자격/수료)</h4>
                <ul>
                  <li>생활체육지도자 2급</li>
                  <li>NASM-CPT (미국 스포츠의학회)</li>
                  <li>대보협 코치아카데미 KASCI 트레이너</li>
                  <li>스포츠 영양 코치 수료</li>
                  <li>태권도 4단 / 특공무술 2단</li>
                  <li>크라브마가 LEVEL 1</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
