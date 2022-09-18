import {toClasses} from '@starkware-industries/commons-js-utils';
import PropTypes from 'prop-types';

import styles from './Link.module.scss';

export const LinkType = {
  READ_MORE: 'readMore',
  EMAIL: 'email',
  ALERT: 'alert'
};

export const LinkSize = {
  SMALL: 'small',
  MEDIUM: 'medium'
};

export const Link = ({
  link,
  text,
  type = LinkType.READ_MORE,
  size = LinkSize.SMALL,
  openInNewTab = false
}) => {
  return (
    <a
      className={toClasses(styles.link, styles[type], styles[size])}
      href={type === LinkType.EMAIL ? `mailto:${link}` : link}
      rel="noreferrer"
      target={openInNewTab ? '_blank' : '_self'}
    >
      {text || link}
    </a>
  );
};

Link.propTypes = {
  link: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  openInNewTab: PropTypes.bool
};
