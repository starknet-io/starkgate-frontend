import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

import {ReactComponent as MinusCircle} from '../../assets/svg/icons/minus-circle.svg';
import {ReactComponent as PlusCircle} from '../../assets/svg/icons/plus-circle.svg';
import {FullScreenContainer} from '../../components/UI';
import Faqs from '../../config/faqs';
import {useFaqTracking, useFaqTranslation} from '../../hooks';
import styles from './Faq.module.scss';

export const Faq = () => {
  const [trackFaqScreen] = useFaqTracking();

  useEffect(() => {
    trackFaqScreen();
  }, []);

  const renderFaqs = () => {
    return Faqs.map((faq, index) => <Question key={index} faq={faq} />);
  };

  return (
    <FullScreenContainer>
      <div className={styles.faq}>
        <Header />
        {renderFaqs()}
      </div>
    </FullScreenContainer>
  );
};

const Header = () => {
  const {titleTxt, subtitleTxt} = useFaqTranslation();

  return (
    <div className={styles.titleContainer}>
      <div className={styles.title}>{titleTxt}</div>
      <div className={styles.subtitle}>{subtitleTxt}</div>
    </div>
  );
};

const Question = ({faq}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleShow = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.container}>
      <div className={styles.questionContainer}>
        <div className={styles.icon}>
          {!isOpen && <PlusCircle height={20} width={20} onClick={toggleShow} />}
          {isOpen && <MinusCircle height={20} width={20} onClick={toggleShow} />}
        </div>
        <div className={styles.question}>{faq.question}</div>
      </div>
      {isOpen && <div className={styles.answer}>{faq.answer}</div>}
      <div className={styles.divider} />
    </div>
  );
};

Question.propTypes = {
  faq: PropTypes.object
};
