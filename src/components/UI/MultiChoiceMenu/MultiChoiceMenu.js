import PropTypes from 'prop-types';
import React from 'react';

import {toClasses} from '../../../utils';
import {Menu} from '../Menu/Menu';
import {MultiChoiceItem} from '../MultiChoiceItem/MultiChoiceItem';
import styles from './MultiChoiceMenu.module.scss';

export const MultiChoiceMenu = ({choices}) => {
  const renderChoiceItems = () => {
    return choices.map(choice => {
      return <MultiChoiceItem key={choice.id} {...choice} />;
    });
  };

  return (
    <Menu>
      <div className={toClasses(styles.multiChoiceMenu)}>
        <div className={styles.container}>{renderChoiceItems()}</div>
      </div>
    </Menu>
  );
};

MultiChoiceMenu.propTypes = {
  choices: PropTypes.arrayOf(PropTypes.object)
};
