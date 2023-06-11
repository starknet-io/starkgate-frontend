import PropTypes from 'prop-types';
import React from 'react';

import {Menu, MultiChoiceItem} from '@ui';

export const MultiChoiceList = ({choices}) => {
  const renderChoiceItems = () => {
    return choices.map(choice => {
      return <MultiChoiceItem key={choice.id} {...choice} />;
    });
  };

  return <Menu>{renderChoiceItems()}</Menu>;
};

MultiChoiceList.propTypes = {
  choices: PropTypes.arrayOf(PropTypes.object)
};
