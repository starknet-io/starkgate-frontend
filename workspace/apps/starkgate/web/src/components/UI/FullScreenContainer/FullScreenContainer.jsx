import PropTypes from 'prop-types';
import React, {forwardRef} from 'react';

import styles from './FullScreenContainer.module.scss';

export const FullScreenContainer = forwardRef((props, ref) => {
  return (
    <div ref={ref} className={styles.fullScreenContainer} {...props}>
      {props.children}
    </div>
  );
});

FullScreenContainer.displayName = 'FullScreenContainer';

FullScreenContainer.propTypes = {
  onScroll: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
