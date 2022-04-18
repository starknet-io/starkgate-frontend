import React, {useEffect} from 'react';

import {track, TrackEvent} from '../../analytics';
import {FullScreenContainer} from '../../components/UI';
import {faqs} from '../../config/faqs';
import {useFaqTranslation} from '../../hooks';
import styles from './Faq.module.scss';

export const Faq = () => {
  const {titleTxt} = useFaqTranslation();

  useEffect(() => {
    track(TrackEvent.FAQ_SCREEN);
  }, []);

  return (
    <FullScreenContainer>
      <div className={styles.faq}>
        <h1>{titleTxt}</h1>
        <ol>
          {faqs.map((faq, i) => (
            <li key={`faq-${i}`} className={styles.question}>
              <h2 dangerouslySetInnerHTML={{__html: faq.question}} />
              <div dangerouslySetInnerHTML={{__html: faq.answer}} />
            </li>
          ))}
        </ol>
      </div>
    </FullScreenContainer>
  );
};
