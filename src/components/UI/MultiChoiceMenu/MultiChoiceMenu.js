import PropTypes from 'prop-types';
import React from 'react';

import {toClasses} from '../../../utils';
import {Menu} from '../Menu/Menu';
import {MultiChoiceErrorMessage} from '../MultiChoiceErrorMessage/MultiChoiceErrorMessage';
import {MultiChoiceList} from '../MultiChoiceList/MultiChoiceList';
import styles from './MultiChoiceMenu.module.scss';

export const MultiChoiceMenu = ({title, description, choices, error, footer}) => {
  return (
    <Menu>
      <div className={toClasses(styles.multiChoiceMenu)}>
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          {description && <p>{description}</p>}
          <MultiChoiceList choices={choices} />
          {error && <MultiChoiceErrorMessage message={error.message} />}
        </div>
        {footer && (
          <>
            <div className={styles.separator} />
            {footer}
          </>
        )}
      </div>
    </Menu>
  );
};

MultiChoiceMenu.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  choices: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.object,
  footer: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
