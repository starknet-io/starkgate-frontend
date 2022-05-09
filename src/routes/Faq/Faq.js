import React, {useEffect} from 'react';

import {TrackEvent} from '../../analytics';
import {FullScreenContainer} from '../../components/UI';
import Faqs from '../../config/faqs';
import {useTracking, useFaqTranslation} from '../../hooks';
import styles from './Faq.module.scss';

export const Faq = () => {
  const {titleTxt} = useFaqTranslation();
  const [trackFaqScreen] = useTracking(TrackEvent.FAQ_SCREEN);

  useEffect(() => {
    trackFaqScreen();
  }, []);

  return (
    <FullScreenContainer>
      <div className={styles.faq}>
        <h1>{titleTxt}</h1>
        <ol>
          {Faqs.map((faq, i) => (
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
