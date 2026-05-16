import React from 'react';
import { programs } from '../../data/trainer';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { Card } from '../common/Card';
import { CTAButton } from '../common/CTAButton';
import { DragScroll } from '../common/DragScroll';
import { CheckCircle2 } from 'lucide-react';
import styles from './ProgramsSection.module.css';

const LOOP_GROUPS = 7;
const CENTER_GROUP_INDEX = Math.floor(LOOP_GROUPS / 2);

export const ProgramsSection: React.FC = () => {
  const renderProgramCard = (
    program: (typeof programs)[number],
    groupIndex: number,
    isDuplicate = false,
    isSegmentStart = false,
  ) => (
    <Card
      key={`${program.id}-${groupIndex}`}
      className={`${styles.card} ${isDuplicate ? styles.duplicateCard : ''}`}
      data-loop-start={isSegmentStart ? 'true' : undefined}
      aria-hidden={isDuplicate}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>{program.title}</h3>
        <span className={styles.target}>{program.target}</span>
      </div>
      
      <p className={styles.description}>{program.description}</p>
      
      <div className={styles.includes}>
        <h4 className={styles.includesTitle}>포함 내용</h4>
        <ul className={styles.list}>
          {program.includes.map((item, idx) => (
            <li key={idx} className={styles.listItem}>
              <CheckCircle2 size={18} className={styles.icon} />
              {item}
            </li>
          ))}
        </ul>
      </div>
      
      <div className={styles.footer}>
        <CTAButton href="#contact" fullWidth variant="outline" tabIndex={isDuplicate ? -1 : undefined}>
          {program.ctaText}
        </CTAButton>
      </div>
    </Card>
  );

  return (
    <section className={styles.section} id="programs">
      <Container>
        <SectionHeading 
          title="Programs" 
          subtitle="목적과 체력에 맞춘 단계별 트레이닝 솔루션" 
        />
        
        <DragScroll
          autoScroll
          autoScrollMediaQuery="(max-width: 768px)"
          autoScrollSpeed={0.095}
          className={styles.scroller}
          loopSegments={LOOP_GROUPS}
          aria-label="Programs"
          role="region"
          tabIndex={0}
        >
          <div className={styles.grid}>
            {Array.from({ length: LOOP_GROUPS }, (_, groupIndex) => (
              <React.Fragment key={groupIndex}>
                {programs.map((program, index) => (
                  renderProgramCard(
                    program,
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
