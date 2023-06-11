import PropTypes from 'prop-types';
import React, {Fragment} from 'react';

import {Divider, Tab} from '@ui';

export const Tabs = ({tabs}) => {
  return tabs.map((tab, index) => {
    return (
      <Fragment key={tab.text}>
        <Tab {...tab} />
        {index !== tabs.length - 1 && <Divider />}
      </Fragment>
    );
  });
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.object)
};
