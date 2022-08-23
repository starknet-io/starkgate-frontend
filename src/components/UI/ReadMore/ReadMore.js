import PropTypes from 'prop-types';

import styles from './ReadMore.module.scss';
import {readMoreTxt} from './ReadMore.strings';

export const ReadMore = ({URL, text, openInNewTab = false}) => {
  return (
    <a className={styles.readMore} href={URL} rel="noreferrer" target={openInNewTab && '_blank'}>
      {text || readMoreTxt}
    </a>
  );
};

ReadMore.propTypes = {
  URL: PropTypes.string,
  text: PropTypes.string,
  openInNewTab: PropTypes.bool
};
