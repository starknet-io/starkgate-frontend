import PropTypes from 'prop-types';
import React from 'react';

import {ReactComponent as DiscordIcon} from '@assets/svg/discord.svg';
import {useConstants} from '@hooks';
import {openInNewTab} from '@starkware-webapps/utils-browser';

import {SideButton} from '../SideButton/SideButton';

export const DiscordButton = ({onClick = () => ({})}) => {
  const {DISCORD_LINK_URL} = useConstants();

  const onClickInternal = () => {
    onClick();
    openInNewTab(DISCORD_LINK_URL);
  };

  return <SideButton icon={<DiscordIcon />} onClick={onClickInternal} />;
};

DiscordButton.propTypes = {
  onClick: PropTypes.func
};
