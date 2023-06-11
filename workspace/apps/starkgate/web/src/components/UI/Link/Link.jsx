import PropTypes from 'prop-types';

import {toClasses} from '@starkware-webapps/utils-browser';

import styles from './Link.module.scss';

export const LinkType = {
  EMAIL: 'email',
  URL: 'url'
};

export const Link = ({
  className,
  icon,
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
      {text || link} {icon}
    </a>
  );
};

Link.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.object,
  link: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.string,
  openInNewTab: PropTypes.bool
};
