import PropTypes from 'prop-types';
import React from 'react';
import useBreakpoint from 'use-breakpoint';

import {Breakpoint} from '../../../enums';
import {toClasses} from '../../../utils';
import styles from './FullScreenContainer.module.scss';

export const FullScreenContainer = ({children}) => {
  const {breakpoint} = useBreakpoint(Breakpoint);

  return (
    <div className={toClasses(styles.fullScreenContainer, styles[breakpoint.toLowerCase()])}>
      {children}
    </div>
  );
};

FullScreenContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
