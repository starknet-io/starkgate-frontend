import PropTypes from 'prop-types';

import styles from './ReadMore.module.scss';

const READ_MORE_TXT = 'read more';

export const ReadMore = ({url, text = READ_MORE_TXT, openInNewTab = false}) => {
  return (
    <a className={styles.readMore} href={url} rel="noreferrer" target={openInNewTab && '_blank'}>
      {text}
    </a>
  );
};

ReadMore.propTypes = {
  url: PropTypes.string,
  text: PropTypes.string,
  openInNewTab: PropTypes.bool
};
