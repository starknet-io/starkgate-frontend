import PropTypes from 'prop-types';
import React, {useCallback} from 'react';

import {useColors} from '@hooks';
import {Divider, MenuItem, Select as MuiSelect, Stack} from '@mui/material';
import {useBlockExplorer} from '@providers';
import {openInNewTab} from '@starkware-webapps/utils-browser';

import {BlockExplorerButton} from '../BlockExplorerButton';
import {BlockExplorerPropTypes} from '../BlockExplorerPropTypes';
import {BlockExplorerLargeSelectTheme, BlockExplorerSelectTheme} from './BlockExplorerSelect.theme';

export const BlockExplorerSelect = ({blockExplorers, ...props}) => {
  const {isDisabled, isLarge, account, tx, onClick} = props;
  const {colorIndigo, colorSpaceCadet, colorWhite, colorDodgerBlue, colorVeryLightAzure} =
    useColors();
  const {blockExplorer: blockExplorerId, selectBlockExplorer} = useBlockExplorer();
  const blockExplorer = blockExplorers[blockExplorerId];

  const handleChange = useCallback(
    event => {
      const selectedBlockExplorer = event.target.dataset.value;
      const {accountUrl, txUrl} = blockExplorers[selectedBlockExplorer];
      openInNewTab((account && accountUrl(account)) || (tx && txUrl(tx)));
      selectBlockExplorer(selectedBlockExplorer);
      onClick && onClick();
    },
    [account]
  );

  const renderItems = useCallback(buttonStyle => {
    const buttonProps = {
      colorBackground: colorSpaceCadet,
      colorText: colorWhite,
      style: {
        border: 'none',
        pointerEvents: 'none',
        ...buttonStyle
      }
    };

    return Object.entries(blockExplorers).map(([id, blockExplorer]) => {
      return (
        <MenuItem key={id} value={id} onClick={handleChange}>
          <BlockExplorerButton blockExplorer={blockExplorer} {...props} {...buttonProps} />
        </MenuItem>
      );
    });
  }, []);

  const Select = ({children}) => (
    <MuiSelect
      IconComponent=""
      disabled={isDisabled}
      renderValue={() => null}
      value={blockExplorerId}
    >
      {children}
    </MuiSelect>
  );

  Select.propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
  };

  const BlockExplorerLargeSelect = () => (
    <Stack
      direction="row"
      sx={{
        border: `1px solid ${colorIndigo}`,
        borderRadius: '8px',
        height: '46px',
        margin: '8px',
        overflow: 'hidden',
        width: '100%',
        flex: '40%'
      }}
    >
      <BlockExplorerButton
        blockExplorer={blockExplorer}
        {...props}
        style={{
          border: 'none',
          margin: 0,
          fontSize: '12px'
        }}
      />
      <Divider
        orientation="vertical"
        sx={{
          bgcolor: colorIndigo,
          height: 'auto'
        }}
      />
      <BlockExplorerLargeSelectTheme>
        <Select>
          {renderItems({
            margin: 0,
            fontSize: '14px',
            justifyContent: 'flex-start',
            paddingRight: '35px',
            fontWeight: '600'
          })}
        </Select>
      </BlockExplorerLargeSelectTheme>
    </Stack>
  );

  const BlockExplorerSmallSelect = () => (
    <Stack
      direction="row"
      sx={{
        opacity: isDisabled ? 0.3 : 1,
        pointerEvents: isDisabled ? 'none' : 'auto',
        alignItems: 'center',
        border: `1px solid ${colorDodgerBlue}`,
        borderRadius: '5px',
        width: 'fit-content',
        '&:hover': {
          '&, *': {
            color: colorVeryLightAzure,
            borderColor: colorVeryLightAzure,
            ':after': {
              bgcolor: colorVeryLightAzure
            },
            'svg path': {
              fill: colorVeryLightAzure
            }
          }
        }
      }}
    >
      <BlockExplorerButton
        blockExplorer={blockExplorer}
        {...props}
        isDisabled={false}
        style={{
          border: 'none',
          minWidth: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly'
        }}
      />
      <Divider
        orientation="vertical"
        sx={{
          bgcolor: colorDodgerBlue,
          height: '18px'
        }}
      />
      <BlockExplorerSelectTheme>
        <Select>
          {renderItems({
            padding: 0
          })}
        </Select>
      </BlockExplorerSelectTheme>
    </Stack>
  );

  return isLarge ? <BlockExplorerLargeSelect /> : <BlockExplorerSmallSelect />;
};

BlockExplorerSelect.propTypes = {
  blockExplorers: PropTypes.object,
  ...BlockExplorerPropTypes
};
