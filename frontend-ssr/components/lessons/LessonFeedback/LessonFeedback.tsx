import React, {useState} from 'react';
import styles from './LessonFeedback.module.scss';

import Rating from '~/components/Rating';

interface Props {
  onRatingSent: (rating: number) => void;
  isRatingVisible: boolean
}

export default function LessonFeedback({ isRatingVisible, onRatingSent }: Props) {
  const [rating, setRating] = useState(0);
  const overlayClassNames = [
    styles['thanks-overlay'],
    'bg-white',
    'absolute-fill',
    (rating !== 0 || !isRatingVisible) ? 'visible' : 'invisible'
  ].join(' ');

  const ratingClassNames = [
    styles['lesson-feedback'],    
    'rounded-md',
    'fixed',
    'overflow-hidden',
    isRatingVisible ? 'visible' : 'invisible'
  ].join(' ');

  const handleOnChange = newRating => {
    setRating(newRating);
    onRatingSent(newRating);
  }

  return (
    <section className={ratingClassNames}>
      <div className="mb-2">Acordă o notă acestei lecții</div>
      <Rating value={rating} onChange={handleOnChange}/>
      <div className={overlayClassNames}>Mulțumim!</div>
    </section>
  );
}
