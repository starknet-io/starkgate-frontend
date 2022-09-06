import {Transition} from '@headlessui/react';
import PropTypes from 'prop-types';
import React from 'react';

import {useColors} from '../../../../hooks';
import {hexToRgba} from '../../../../utils';
import {ToastBody} from '../ToastBody/ToastBody';
import {ToastButton, ToastButtons} from '../ToastButton/ToastButton';
import {ToastFooter} from '../ToastFooter/ToastFooter';
import {ToastHeader} from '../ToastHeader/ToastHeader';
import {ToastSeparator} from '../ToastSeparator/ToastSeparator';
import styles from './CallToActionToast.module.scss';

export const CallToActionToast = ({
  t,
  titleTxt,
  bodyTxt,
  bodyStyle,
  style,
  sideIcon,
  dismissTxt,
  actionIcon,
  actionTxt,
  backgroundColor,
  footer,
  onAction,
  onDismiss
}) => {
  const {colorOrangeSoda, colorAuroMetalSaurus} = useColors();

  return (
    <Transition
      appear={true}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      show={t.visible}
    >
      <div className={styles.callToActionToast} style={style}>
        <div className={styles.container}>
          <div
            className={styles.left}
            style={{backgroundColor: `${hexToRgba(backgroundColor || colorOrangeSoda, 0.15)}`}}
          >
            <div className={styles.sideIcon}>{sideIcon}</div>
          </div>
          <div className={styles.right}>
            <ToastHeader title={titleTxt} withClose={true} onClose={onDismiss} />
            <ToastBody body={bodyTxt} style={bodyStyle} />
            {footer && (
              <div>
                <ToastSeparator />
                <ToastFooter>{footer}</ToastFooter>
                <ToastSeparator />
              </div>
            )}
            {(dismissTxt || actionTxt) && (
              <ToastButtons>
                {dismissTxt && (
                  <ToastButton color={colorAuroMetalSaurus} text={dismissTxt} onClick={onDismiss} />
                )}
                {actionTxt && (
                  <ToastButton
                    color={colorOrangeSoda}
                    icon={actionIcon}
                    text={actionTxt}
                    onClick={onAction}
                  />
                )}
              </ToastButtons>
            )}
          </div>
        </div>
      </div>
    </Transition>
  );
};

CallToActionToast.propTypes = {
  t: PropTypes.object,
  titleTxt: PropTypes.string,
  bodyTxt: PropTypes.string,
  bodyStyle: PropTypes.object,
  style: PropTypes.object,
  sideIcon: PropTypes.object,
  dismissTxt: PropTypes.oneOfType([PropTypes.string, PropTypes.any]),
  actionTxt: PropTypes.oneOfType([PropTypes.string, PropTypes.any]),
  actionIcon: PropTypes.object,
  backgroundColor: PropTypes.string,
  footer: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.any
  ]),
  onAction: PropTypes.oneOfType([PropTypes.func, PropTypes.any]),
  onDismiss: PropTypes.oneOfType([PropTypes.func, PropTypes.any])
};
