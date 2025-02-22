import React, { PropsWithChildren, useState, useEffect } from 'react';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import { LessonMenu } from '~/components/lessons';
import { Chapter } from '~/components/TableOfContents';

import styles from './Lesson.module.scss';
import { withClientMonitoring } from '~/services/Hooks';
import { GITHUB_URL } from '~/services/Constants';
import LessonHeading from './LessonHeading/LessonHeading';
import LessonExercises from './LessonExercises/LessonExercises';
import LessonFeedback from './LessonFeedback/LessonFeedback';

interface Props {
  title: string;
  chapters: Chapter[];
  withExercises?: boolean;
}

export default function Lesson({
  children,
  title,
  chapters,
  withExercises = true,
} : PropsWithChildren<Props>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRatingVisible, setIsRatingVisible] = useState(false);

  withClientMonitoring();

  const handleOnRating = () => {
    setTimeout(setIsRatingVisible, 2000, false);
  };

  useEffect(() => {
    setTimeout(setIsRatingVisible, 2000, true);
  }, []);

  return (
    <div className={styles.lesson}>
      <LessonMenu
        isOpen={isMenuOpen}
        close={() => setIsMenuOpen(false)}
        title={title}
        chapters={chapters}
      />
      <main>
        <Header href="/lectii" onMenuClick={() => setIsMenuOpen(true)} />
        <article>
          <h1>
            {title}
          </h1>
          {children}
        </article>
        <div className="my-5 text-right mr-2">
          <p>
            Ai vreo sugestie de îmbunătățire a acestei lecții?
            {' '}
            <a href={`${GITHUB_URL}/tree/master/frontend-ssr/curriculum`} target="_blank" rel="noreferrer">
              Contribuie pe GitHub
            </a>
          </p>
        </div>
        {withExercises && <LessonExercises /> }
        <LessonFeedback
          isRatingVisible={isRatingVisible}
          onRatingSent={handleOnRating}
        />
        <Footer />
      </main>
    </div>
  );
}
