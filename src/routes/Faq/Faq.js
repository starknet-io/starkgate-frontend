import React, {useEffect} from 'react';
import useBreakpoint from 'use-breakpoint';

import {track, TrackEvent} from '../../analytics';
import {faqs} from '../../config/faqs';
import {Breakpoint} from '../../enums';
import {toClasses} from '../../utils/object';
import styles from './Faq.module.scss';
import {TITLE_TXT} from './Faq.strings';

export const Faq = () => {
  const {breakpoint} = useBreakpoint(Breakpoint);

  useEffect(() => {
    track(TrackEvent.FAQ_SCREEN);
  }, []);

  return (
    <div className={toClasses(styles.faq, styles[breakpoint.toLowerCase()])}>
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
  );
};
