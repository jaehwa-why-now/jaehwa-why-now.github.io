import React from 'react';
import { reviews } from '../../data/trainer';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { Card } from '../common/Card';
import styles from './ReviewsSection.module.css';
import { Star } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  return (
    <section className={styles.section} id="reviews">
      <Container>
        <SectionHeading 
          title="Member Reviews" 
          subtitle="실제 회원님들의 진솔한 후기를 확인하세요" 
        />
        
        <div className={styles.grid}>
          {reviews.map((review) => (
            <Card key={review.id} className={styles.card}>
              <div className={styles.stars}>
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="var(--accent-primary)" color="var(--accent-primary)" />
                ))}
              </div>
              <p className={styles.text}>"{review.text}"</p>
              <div className={styles.footer}>
                <span className={styles.name}>{review.name}</span>
                <span className={styles.type}>{review.type}</span>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};
