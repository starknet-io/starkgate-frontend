export const translations = {
  containers: {
    header: {
      chainTxt: 'Goerli testnet',
      accountWalletBtnTxt: '{{address}}',
      connectWalletBtnTxt: 'Connect {{network}} Wallet',
      connectingWalletBtnTxt: 'Connecting {{network}} Wallet...',
      tabs: {
        discoverAppsTxt: 'Discover apps',
        termsTxt: 'Terms',
        faqTxt: 'FAQ',
        contactUsTxt: 'Contact us'
      }
    },
    footer: {
      rightsTxt: '© {{fullYear}} StarkWare Industries Ltd. All Rights Reserved'
    }
  },
  screens: {
    faq: {
      titleTxt: 'Frequently asked questions',
      subtitleTxt: 'Everything you need to know about StarkGate.'
    },
    terms: {
      titleTxt: 'Terms of Service',
      lastRevisedTxt: 'Last Revised: April 4, 2022',
      acceptBtnTxt: 'I Accept'
    }
  },
  menus: {
    backBtnTxt: 'Back',
    account: {
      titleTxt: '{{network}} Account',
      copiedMsgTxt: 'Copied!',
      logoutBtnTxt: 'Logout',
      btnTxt: 'Account',
      transferLogContainer: {
        titleTxt: 'Transfer log',
        singleOverviewTxt: 'recent transfer',
        overviewTxt: 'recent transfers',
        emptyMsgTxt: 'Transfers will appear here...',
        viewMoreTxt: 'View more',
        viewLessTxt: 'View less',
        transferLog: {
          completeTransferBtnTxt: 'Complete transfer',
          waitingToBeCompletedMsg: 'Waiting to be completed by SpaceShard'
        }
      }
    },
    selectToken: {
      titleTxt: 'Select token from ',
      searchPlaceholder: 'Search'
    },
    source: {
      depositTxt: 'Deposit',
      withdrawTxt: 'Withdraw',
      toTxt: 'to',
      fromTxt: 'from'
    },
    transfer: {
      negativeValueErrorMsg: 'Amount must be a positive number',
      tooManyDigitsErrorMsg: 'Too many decimal places',
      insufficientBalanceErrorMsg: 'Insufficient balance',
      maxDepositErrorMsg:
        'You have exceeded the maximum transfer amount ({{maxDeposit}} {{symbol}}). Please reduce the amount and try again.',
      bridgeIsFullErrorMsg: 'The token bridge is currently full, try another token',
      maxBtnTxt: 'Max',
      balanceTitleTxt: 'Available balance',
      inputPlaceholderTxt: '0.00',
      transferBtnTxt: 'Transfer',
      amountBtnTxt: 'Enter an amount',
      loginWalletButtonTxt: 'Connect Wallet',
      readMoreTxt: 'read more',
      enableAutoWithdrawal: 'Use the automatic withdrawal service by SpaceShard',
      autoWithdrawalUnavailable: 'The automatic withdrawal service is temporarily not available',
      enableFastWithdrawal: 'Enable DAI fast withdrawal through Maker Teleport',
      fastWithdrawalDisclaimerTitle: 'You enabled fast withdrawal',
      fastWithdrawalDisclaimerTxt:
        'Move DAI from Starknet to Ethereum in 10-60 seconds using Maker Teleport. MakerDAO charges a 0.01% for this service, so {{feeAmount}} DAI will be deducted.',
      learnMoreTxt: 'Learn more'
    },
    providers: {
      descriptionTxt: 'Transfer crypto between {{source}} and Starknet'
    }
  },
  modals: {
    unsupported: {
      titleTxt: 'Oops! StarkGate is not yet available on mobile devices',
      bodyTxt: 'For the best experience, please use a desktop or laptop.'
    },
    login: {
      titleTxt: 'Connect {{networkName}} Wallet',
      unsupportedChainIdTxt: 'Please select {{chainName}} in your wallet',
      installTxt: 'Install {{wallet}}'
    },
    transactionSubmitted: {
      l1TxTitleTxt: 'Transaction sent',
      l2TxTitleTxt: 'Transaction is being processed on Starknet',
      btnTxt: 'View on {{explorer}}',
      transferAlertTitle: 'This is an Alpha version',
      transferToL1Txt: 'Please come back in ~12h to complete the withdrawal on Ethereum',
      transferToL2Txt: 'Your transaction has been successfully sent to Starknet!',
      transferToL2AlertTxt:
        'Completing a Ethereum → Starknet transfer may take up to several hours depending on the congestion. It may take a while for your wallet balance to update.',
      completeTransferToL1Txt: 'Your transfer is completed on Ethereum!'
    },
    transferProgress: {
      approval: {
        type: 'Approval required',
        message: 'Requesting permission to access your {{symbol}} funds.'
      },
      deposit: {
        type: 'Transfer in progress',
        message: 'Transferring {{amount}} {{symbol}} to Starknet...'
      },
      initiateWithdraw: {
        type: 'Initiate transfer',
        message: 'Initiating transfer of {{amount}} {{symbol}} from Starknet...'
      },
      withdraw: {
        type: 'Transfer in progress',
        message: 'Transferring {{amount}} {{symbol}} to Ethereum...'
      },
      waitForConfirm: {
        type: '{{walletName}} confirmation...',
        message: 'Do not refresh or close the page while waiting for the operation to be completed.'
      },
      confirmTxt: 'Confirm this transaction in your wallet',
      maxTotalBalanceErrorMsg:
        "The maximal value allowed on StarkGate right now is {{maxTotalBalance}} {{symbol}} and the current value on StarkGate is {{currentTotalBalance}} {{symbol}}, so it's not possible to complete your deposit of {{amount}} {{symbol}}.\n\nPlease reduce your deposit amount and try again.",
      errorTitle: 'Transaction error',
      limitationErrorTitle: 'Limitation error'
    },
    onboarding: {
      titleTxt: 'Before takeoff, a few important notes!',
      subtitleTxt: 'While using StarkGate Alpha:',
      bulletsTxt: [
        'Use Google Chrome or Mozilla Firefox',
        'Refrain from switching browsers',
        'Do not refresh the page while the transfer is being processed',
        'Do not delete the local storage of the browser'
      ],
      incognitoTxt:
        'The current StarkGate Alpha version <b>does not</b> support browsing in incognito mode.'
    },
    blockedAddress: {
      titleTxt: 'Blocked Address',
      descriptionTxt:
        'This address is blocked on the starkgate bridge interface because it is associated with one or more blocked activities.',
      closeButtonTxt: 'Close'
    }
  },
  toasts: {
    alphaDisclaimerNotice: {
      titleTxt: 'Starknet Alpha',
      bodyTxt:
        'This is an ALPHA version of Starknet, and its Bridge. As such, delays may occur, and catastrophic bugs may lurk. Thanks, OGs, for trying it at this early stage.'
    },
    transferLogLink: 'View on Transfer Log',
    pendingTransfer: {
      pendingTxt: 'Waiting for transaction to be accepted on Starknet',
      consumedTxt: 'Transaction accepted on Starknet',
      rejectedTxt: 'Transaction rejected on Starknet'
    },
    completeTransfer: {
      titleTxt: 'Starknet finished processing your transfer!',
      bodyTxt:
        'Click on Complete Transfer to transfer the funds from Starknet Bridge to your Ethereum address.',
      dismissBtnTxt: 'Dismiss',
      completeTransferBtnTxt: 'Complete Transfer',
      fastIndicationTxt: 'Fast Withdrawal'
    }
  }
};
