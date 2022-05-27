import PropTypes from 'prop-types';
import React from 'react';

import {toClasses} from '../../../utils';
import {Menu} from '../Menu/Menu';
import {MultiChoiceErrorMessage} from '../MultiChoiceErrorMessage/MultiChoiceErrorMessage';
import {MultiChoiceItem} from '../MultiChoiceItem/MultiChoiceItem';
import styles from './MultiChoiceMenu.module.scss';

export const MultiChoiceMenu = ({title, description, choices, error, footer}) => {
  const renderChoiceItems = () => {
    return choices.map(choice => {
      return (
        <MultiChoiceItem
          key={choice.id}
          description={choice.description}
          isDisabled={choice.isDisabled || false}
          logoPath={choice.logoPath}
          name={choice.name}
          onClick={choice.onClick}
        />
      );
    });
  };

  return (
    <Menu>
      <div className={toClasses(styles.multiChoiceMenu, 'center')}>
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          {description && <p>{description}</p>}
          <div className={styles.container}>{renderChoiceItems()}</div>
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
