import PropTypes from 'prop-types';
import React from 'react';

import {Image} from '../Image/Image';
import styles from './StyledBackground.module.scss';

export const StyledBackground = ({images, children}) => {
  const renderImages = () => {
    return images.map(image => <Image key={image} className={styles.image} name={image} />);
  };

  return (
    <div className={styles.styledBackground}>
      {renderImages()}
      {children}
    </div>
  );
};

StyledBackground.propTypes = {
  images: PropTypes.array,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
