import PropTypes from 'prop-types';
import React, {useCallback} from 'react';

import {useBlockExplorerComponentTranslation, useColors} from '@hooks';
import {evaluate} from '@starkware-webapps/utils';
import {openInNewTab} from '@starkware-webapps/utils-browser';
import {Button, Circle, LinkButton} from '@ui';

import {BlockExplorerPropTypes} from './BlockExplorerPropTypes';

export const BlockExplorerButton = ({
  account,
  blockExplorer,
  isDisabled,
  isLarge,
  tx,
  onClick: onClickProp,
  ...buttonProps
}) => {
  const {colorIndigo, colorWhite, colorGainsboro} = useColors();
  const {btnTxt} = useBlockExplorerComponentTranslation();
  const {name, accountUrl, txUrl, Logo} = blockExplorer;
  const url = (account && accountUrl(account)) || (tx && txUrl(tx));

  const onClick = useCallback(() => {
    openInNewTab(url);
    onClickProp && onClickProp();
  }, []);

  return isLarge ? (
    <Button
      colorBackground={colorWhite}
      colorBorder={colorIndigo}
      colorText={colorIndigo}
      height={48}
      iconLeft={
        <Circle color={colorGainsboro} size={37}>
          <Logo />
        </Circle>
      }
      style={{
        fontSize: '12px'
      }}
      text={evaluate(btnTxt, {explorer: name})}
      width="100%"
      onClick={onClick}
      {...buttonProps}
    />
  ) : (
    <LinkButton
      isDisabled={isDisabled}
      style={buttonProps.style}
      text={name}
      url={url}
      onClick={onClickProp}
    />
  );
};

BlockExplorerButton.propTypes = {
  blockExplorer: PropTypes.object,
  ...BlockExplorerPropTypes
};
