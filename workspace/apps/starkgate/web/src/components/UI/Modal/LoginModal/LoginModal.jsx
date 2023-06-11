import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

import {useLoginTracking, useLoginTranslation, useWalletHandlers} from '@hooks';
import {useHideModal, useLogin, useWalletsStatus} from '@providers';
import {NetworkType, isConnected, isL1Network, isL2Network} from '@starkware-webapps/enums';
import {useDidMountEffect, useLogger} from '@starkware-webapps/ui';
import {evaluate} from '@starkware-webapps/utils';
import {MultiChoiceMenu} from '@ui';

const LoginModal = ({networkName}) => {
  const logger = useLogger('LoginModal');
  const [error, setError] = useState(null);
  const {titleTxt} = useLoginTranslation();
  const [trackWalletClick, trackLoginError] = useLoginTracking();
  const {statusL1, statusL2} = useWalletsStatus();
  const [network, setNetwork] = useState(networkName || NetworkType.L1);
  const walletHandlers = useWalletHandlers(network);
  const {isLoggedIn} = useLogin();
  const hideModal = useHideModal();

  useDidMountEffect(() => {
    if (isL2Network(network) && isConnected(statusL2)) {
      setNetwork(NetworkType.L1);
    }

    if (isL1Network(network) && isConnected(statusL1)) {
      setNetwork(NetworkType.L2);
    }
  }, [statusL1, statusL2]);

  useEffect(() => {
    isLoggedIn && hideModal();
  }, [isLoggedIn]);

  useEffect(() => {
    const walletHandler = walletHandlers.find(({error}) => !!error);
    if (walletHandler) {
      const {error} = walletHandler;
      logger.log('set wallet error', error);
      setError(error);
    } else {
      setError(null);
    }
  }, [walletHandlers]);

  useEffect(() => {
    if (error) {
      trackLoginError({error});
    }
  }, [error]);

  const walletChoiceClick = async walletHandler => {
    const {name} = walletHandler;
    trackWalletClick({name});
    logger.log(`connect to ${name}`);
    await walletHandler.connect();
  };

  const mapLoginWalletsToChoices = () => {
    return walletHandlers.map(walletHandler => {
      return {
        ...walletHandler,
        onClick: () => walletChoiceClick(walletHandler)
      };
    });
  };

  return (
    <MultiChoiceMenu
      choices={mapLoginWalletsToChoices()}
      error={error}
      title={evaluate(titleTxt, {networkName: network})}
    />
  );
};

export default LoginModal;

LoginModal.propTypes = {
  networkName: PropTypes.string
};
