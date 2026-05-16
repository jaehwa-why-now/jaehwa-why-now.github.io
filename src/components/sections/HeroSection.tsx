import React from 'react';
import { trainerProfile, heroStats } from '../../data/trainer';
import { Container } from '../common/Container';
import { CTAButton } from '../common/CTAButton';
import styles from './HeroSection.module.css';

export const HeroSection: React.FC = () => {
  return (
    <section className={styles.hero} id="home">
      <Container>
        <div className={styles.grid}>
          <div className={styles.content}>
            <span className={styles.greeting}>안녕하세요, {trainerProfile.name} 팀장입니다</span>
            <h1 className={styles.title}>
              몸의 변화를 넘어,<br />
              <span className={styles.highlight}>생활 습관까지</span> 함께 설계합니다
            </h1>
            <p className={styles.subtitle}>
              초보자도 지속할 수 있는 1:1 맞춤 PT.<br />
              체형, 생활패턴, 운동 목적에 맞춘 개인별 트레이닝을 경험해보세요.
            </p>
            
            <div className={styles.ctaGroup}>
              <CTAButton href="#contact" variant="primary" size="lg">
                무료 상담 신청
              </CTAButton>
              <CTAButton href="#programs" variant="secondary" size="lg">
                프로그램 보기
              </CTAButton>
            </div>

            <div className={styles.stats}>
              {heroStats.map((stat, index) => (
                <div key={index} className={styles.statItem}>
                  <p className={styles.statValue}>{stat.value}</p>
                  <p className={styles.statLabel}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className={styles.imageWrapper}>
            <div className={styles.heroImageContainer}>
              <img src={trainerProfile.heroImage} alt={`${trainerProfile.name} 팀장`} className={styles.heroImage} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
