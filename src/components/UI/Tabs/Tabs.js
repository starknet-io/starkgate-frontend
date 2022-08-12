import React, {Fragment} from 'react';
import {useLocation} from 'react-router-dom';

import {useTabsTranslation} from '../../../hooks';
import {useApp} from '../../../providers/AppProvider';
import {Divider} from '../Divider/Divider';
import {Tab} from '../Tab/Tab';

export const Tabs = () => {
  const {navigateToRoute} = useApp();
  const {termsTxt, faqTxt} = useTabsTranslation();
  const {pathname} = useLocation();

  const tabs = [
    {
      text: termsTxt,
      isActive: pathname === '/terms',
      onClick: () => navigateToRoute('/terms')
    },
    {
      text: faqTxt,
      isActive: pathname === '/faq',
      onClick: () => navigateToRoute('/faq')
    }
  ];

  return tabs.map((tab, index) => {
    return (
      <Fragment key={index}>
        <Tab isActive={tab.isActive} text={tab.text} onClick={tab.onClick} />
        {index !== tabs.length - 1 && <Divider />}
      </Fragment>
    );
  });
};
