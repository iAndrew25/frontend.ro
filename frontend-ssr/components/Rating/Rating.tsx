import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import styles from './Rating.module.scss';

interface Props {
  count?: number;
  value: number;
  onChange: (value: number) => void;
}

export default function Rating({ count, value, onChange }: Props) {
  return (
    <div className={styles.rating}>
      {Array(count).fill().map((_, index) => 
        <FontAwesomeIcon
          key={index}
          icon={faStar}
          onClick={() => onChange(count - index)}
          className={count - index <= value ? 'text-yellow' : 'text-silver'}
        />
      )}
    </div>
  );
}

Rating.defaultProps = {
  count: 5
}