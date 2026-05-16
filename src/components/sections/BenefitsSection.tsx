import React from 'react';
import { benefits } from '../../data/trainer';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { Card } from '../common/Card';
import styles from './BenefitsSection.module.css';

export const BenefitsSection: React.FC = () => {
  const renderBenefitCard = (benefit: (typeof benefits)[number], index: number, isDuplicate = false) => {
    const IconComponent = benefit.icon;

    return (
      <Card
        key={`${benefit.title}-${index}${isDuplicate ? '-duplicate' : ''}`}
        className={styles.card}
        aria-hidden={isDuplicate}
      >
        <div className={styles.iconWrapper}>
          <IconComponent size={32} />
        </div>
        <h3 className={styles.title}>{benefit.title}</h3>
        <p className={styles.description}>{benefit.description}</p>
      </Card>
    );
  };

  return (
    <section className={styles.section}>
      <Container>
        <SectionHeading 
          title="Why Choose Me?" 
          subtitle="수많은 회원님들이 저와 함께 결과를 만든 이유입니다" 
        />
        
        <div className={styles.scroller}>
          <div className={styles.grid}>
            <div className={styles.group}>
              {benefits.map((benefit, index) => renderBenefitCard(benefit, index))}
            </div>
            <div className={`${styles.group} ${styles.duplicateGroup}`} aria-hidden="true">
              {benefits.map((benefit, index) => renderBenefitCard(benefit, index, true))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
