import PropTypes from 'prop-types';

import styles from './TextSwitch.module.scss';
import {TextSwitchTab} from './TextSwitchTab';

const INLINE_PADDING = '8px';

export const TextSwitch = ({tabs}) => {
  const activeTabIndex = tabs.findIndex(({isActive}) => isActive);

  return (
    <div
      className={styles.textSwitch}
      style={{
        '--tabs-count': tabs.length,
        '--active-tab-index': activeTabIndex,
        '--inline-padding': INLINE_PADDING
      }}
    >
      {tabs.map((tab, index) => {
        return (
          <TextSwitchTab
            key={index}
            isActive={tab.isActive}
            text={tab.text}
            onClick={tab.onClick}
          />
        );
      })}
    </div>
  );
};

TextSwitch.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      isActive: PropTypes.bool,
      onClick: PropTypes.func
    })
  )
};
