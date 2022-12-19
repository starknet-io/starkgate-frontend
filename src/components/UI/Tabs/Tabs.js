import PropTypes from 'prop-types';
import React, {Fragment} from 'react';

import {Divider} from '../Divider/Divider';
import {Tab} from '../Tab/Tab';

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
