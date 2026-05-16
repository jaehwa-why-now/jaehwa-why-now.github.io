import React from 'react';
import { programs } from '../../data/trainer';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { Card } from '../common/Card';
import { CTAButton } from '../common/CTAButton';
import { CheckCircle2 } from 'lucide-react';
import styles from './ProgramsSection.module.css';

export const ProgramsSection: React.FC = () => {
  const renderProgramCard = (program: (typeof programs)[number], isDuplicate = false) => (
    <Card
      key={`${program.id}${isDuplicate ? '-duplicate' : ''}`}
      className={styles.card}
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
        
        <div className={styles.scroller} aria-label="Programs carousel">
          <div className={styles.grid}>
            {[0, 1, 2].map((groupIndex) => (
              <div
                key={groupIndex}
                className={`${styles.group} ${groupIndex > 0 ? styles.duplicateGroup : ''}`}
                aria-hidden={groupIndex > 0}
              >
                {programs.map((program) => renderProgramCard(program, groupIndex > 0))}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
