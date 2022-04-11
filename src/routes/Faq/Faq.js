import React, {useEffect} from 'react';

import {track, TrackEvent} from '../../analytics';
import {FullScreenContainer} from '../../components/UI';
import {faqs} from '../../config/faqs';
import styles from './Faq.module.scss';
import {TITLE_TXT} from './Faq.strings';

export const Faq = () => {
  useEffect(() => {
    track(TrackEvent.FAQ_SCREEN);
  }, []);

  return (
    <FullScreenContainer>
      <div className={styles.faq}>
        <h1>{TITLE_TXT}</h1>
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
