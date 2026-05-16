import React, { useState } from 'react';
import { faqs } from '../../data/trainer';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { ChevronDown } from 'lucide-react';
import styles from './FAQSection.module.css';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.section} id="faq">
      <Container>
        <SectionHeading 
          title="Frequently Asked Questions" 
          subtitle="상담 전 가장 많이 물어보시는 질문들입니다" 
        />
        
        <div className={styles.faqList}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={index} 
                className={`${styles.faqItem} ${isOpen ? styles.open : ''}`}
              >
                <button 
                  className={styles.questionBtn} 
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                >
                  <span className={styles.question}>{faq.question}</span>
                  <ChevronDown className={styles.icon} size={20} />
                </button>
                
                <div 
                  className={styles.answerWrapper}
                  aria-hidden={!isOpen}
                >
                  <div className={styles.answer}>
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
