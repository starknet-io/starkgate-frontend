import PropTypes from 'prop-types';
import React from 'react';

import {toClasses} from '@starkware-webapps/utils-browser';

import {Alert, AlertType} from '../Alert/Alert';
import {Menu} from '../Menu/Menu';
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
          {error && (
            <>
              <br />
              <Alert message={error.message} title={error.name} type={AlertType.ERROR} />
            </>
          )}
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
