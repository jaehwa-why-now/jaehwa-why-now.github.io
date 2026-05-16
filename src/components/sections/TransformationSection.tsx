import React from 'react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import styles from './TransformationSection.module.css';

export const TransformationSection: React.FC = () => {
  // Mock data since images are placeholders
  const cases = [
    { id: 1, label: "3개월 다이어트", desc: "체지방 -8kg / 근육량 유지" },
    { id: 2, label: "6개월 벌크업", desc: "체중 +10kg / 골격근량 +5kg" },
    { id: 3, label: "바디프로필", desc: "4개월 준비 완주" }
  ];

  return (
    <section className={styles.section} id="transformation">
      <Container>
        <SectionHeading 
          title="Transformations" 
          subtitle="회원님들의 실제 변화 사례입니다. 개인의 노력에 따라 결과는 다를 수 있습니다." 
        />
        
        <div className={styles.grid}>
          {cases.map((c) => (
            <div key={c.id} className={styles.caseCard}>
              <div className={styles.imageGrid}>
                <div className={styles.imagePlaceholder}>
                  <span className={styles.badge}>Before</span>
                </div>
                <div className={styles.imagePlaceholder}>
                  <span className={styles.badge}>After</span>
                </div>
              </div>
              <div className={styles.caseInfo}>
                <h4 className={styles.caseLabel}>{c.label}</h4>
                <p className={styles.caseDesc}>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
