import {toClasses} from '@starkware-industries/commons-js-utils';
import PropTypes from 'prop-types';

import styles from './Link.module.scss';

export const LinkType = {
  EMAIL: 'email',
  URL: 'url'
};

export const Link = ({
  className,
  link,
  text,
  type = LinkType.URL,
  openInNewTab = false,
  ...props
}) => {
  return (
    <a
      className={toClasses(styles.link, className)}
      href={type === LinkType.EMAIL ? `mailto:${link}` : link}
      rel="noreferrer"
      target={openInNewTab ? '_blank' : '_self'}
      {...props}
    >
      {text || link}
    </a>
  );
};

Link.propTypes = {
  className: PropTypes.string,
  link: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.string,
  openInNewTab: PropTypes.bool
};
