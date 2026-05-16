import React from 'react';
import { processSteps } from '../../data/trainer';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import styles from './ProcessSection.module.css';

export const ProcessSection: React.FC = () => {
  return (
    <section className={styles.section}>
      <Container>
        <SectionHeading 
          title="Training Process" 
          subtitle="체계적이고 명확한 트레이닝 과정을 확인하세요" 
        />
        
        <div className={styles.timeline}>
          {processSteps.map((step, index) => (
            <div key={index} className={styles.step}>
              <div className={styles.stepNumber}>{step.step}</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
