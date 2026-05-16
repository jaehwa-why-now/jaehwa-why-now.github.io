import React, { useEffect, useState } from 'react';
import { programs } from '../../data/trainer';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { Card } from '../common/Card';
import { CTAButton } from '../common/CTAButton';
import { DragScroll } from '../common/DragScroll';
import { CheckCircle2 } from 'lucide-react';
import styles from './ProgramsSection.module.css';

const MOBILE_QUERY = '(max-width: 768px)';
const LOOP_GROUPS = 7;
const CENTER_GROUP_INDEX = Math.floor(LOOP_GROUPS / 2);

export const ProgramsSection: React.FC = () => {
  const [isMobileLoop, setIsMobileLoop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_QUERY);
    const updateMobileLoop = () => setIsMobileLoop(mediaQuery.matches);

    updateMobileLoop();
    mediaQuery.addEventListener('change', updateMobileLoop);

    return () => mediaQuery.removeEventListener('change', updateMobileLoop);
  }, []);

  const renderProgramCard = (
    program: (typeof programs)[number],
    groupIndex: number,
    isDuplicate = false,
    isSegmentStart = false,
  ) => (
    <Card
      key={`${program.id}-${groupIndex}`}
      className={styles.card}
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

  const renderedPrograms = isMobileLoop
    ? Array.from({ length: LOOP_GROUPS }, (_, groupIndex) => (
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
      ))
    : programs.map((program) => renderProgramCard(program, 0));

  return (
    <section className={styles.section} id="programs">
      <Container>
        <SectionHeading 
          title="Programs" 
          subtitle="목적과 체력에 맞춘 단계별 트레이닝 솔루션" 
        />
        
        <DragScroll
          autoScroll={isMobileLoop}
          autoScrollMediaQuery={MOBILE_QUERY}
          autoScrollSpeed={0.095}
          className={styles.scroller}
          loopSegments={isMobileLoop ? LOOP_GROUPS : 1}
          aria-label="Programs"
          role="region"
          tabIndex={0}
        >
          <div className={styles.grid}>
            {renderedPrograms}
          </div>
        </DragScroll>
      </Container>
    </section>
  );
};
