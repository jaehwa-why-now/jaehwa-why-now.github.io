import React from 'react';
import { benefits } from '../../data/trainer';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { Card } from '../common/Card';
import { DragScroll } from '../common/DragScroll';
import styles from './BenefitsSection.module.css';

const LOOP_GROUPS = 7;
const CENTER_GROUP_INDEX = Math.floor(LOOP_GROUPS / 2);

export const BenefitsSection: React.FC = () => {
  const renderBenefitCard = (
    benefit: (typeof benefits)[number],
    index: number,
    groupIndex: number,
    isDuplicate = false,
    isSegmentStart = false,
  ) => {
    const IconComponent = benefit.icon;

    return (
      <Card
        key={`${benefit.title}-${index}-${groupIndex}`}
        className={`${styles.card} ${isDuplicate ? styles.duplicateCard : ''}`}
        data-loop-start={isSegmentStart ? 'true' : undefined}
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
        
        <DragScroll
          autoScroll
          autoScrollMediaQuery="(max-width: 768px)"
          autoScrollSpeed={0.085}
          className={styles.scroller}
          loopSegments={LOOP_GROUPS}
          aria-label="Why Choose Me"
          role="region"
          tabIndex={0}
        >
          <div className={styles.grid}>
            {Array.from({ length: LOOP_GROUPS }, (_, groupIndex) => (
              <React.Fragment key={groupIndex}>
                {benefits.map((benefit, index) => (
                  renderBenefitCard(
                    benefit,
                    index,
                    groupIndex,
                    groupIndex !== CENTER_GROUP_INDEX,
                    index === 0,
                  )
                ))}
              </React.Fragment>
            ))}
          </div>
        </DragScroll>
      </Container>
    </section>
  );
};
