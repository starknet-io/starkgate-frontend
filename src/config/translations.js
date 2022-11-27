export default {
  containers: {
    header: {
      chainTxt: 'Goerli testnet',
      accountWalletBtnTxt: '{{address}}',
      connectWalletBtnTxt: 'Connect {{network}} Wallet',
      tabs: {
        termsTxt: 'Terms',
        faqTxt: 'FAQ'
      }
    },
    footer: {
      rightsTxt: '© 2022 StarkWare Industries Ltd. All Rights Reserved'
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
        titleTxt: 'Transfers log',
        singleOverviewTxt: 'recent transfer',
        overviewTxt: 'recent transfers',
        emptyMsgTxt: 'Transfers will appear here...',
        viewMoreTxt: 'View more',
        viewLessTxt: 'View less',
        transferLog: {
          completeTransferBtnTxt: 'Complete transfer'
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
      readMoreTxt: 'read more'
    },
    providers: {
      descriptionTxt: 'Transfer crypto between {{source}} and StarkNet'
    }
  },
  modals: {
    login: {
      titleTxt: 'Connect {{networkName}} Wallet',
      unsupportedChainIdTxt: 'Please select {{chainName}} in your wallet',
      unsupportedBrowserTxt:
        "Note - The current version of StarkGate (Alpha) doesn't support your browser. Use Chrome or Firefox to connect."
    },
    transactionSubmitted: {
      titleTxt: 'Transaction sent',
      btnTxt: 'View on {{explorer}}',
      transferAlertTitle: 'This is an Alpha version',
      transferToL1Txt: 'Your transaction is now being processing on StarkNet.',
      transferToL1AlertTxt:
        'The StarkNet → Ethereum transfer divided into two stages:\n• A waiting period of several hours is expected between the stages.\n• At the end of the first step, you will be required to sign in order to complete the transfer.',
      transferToL2Txt: 'Your transaction has been successfully sent to StarkNet!',
      transferToL2AlertTxt:
        'Completing a Ethereum → StarkNet transfer may take up to several hours depending on the congestion. It may take a while for your wallet balance to update.',
      completeTransferToL1Txt: 'Your transfer is completed on Ethereum!'
    },
    transferProgress: {
      approval: {
        type: 'Approval required',
        message: 'Requesting permission to access your {{symbol}} funds.'
      },
      deposit: {
        type: 'Transfer in progress',
        message: 'Transferring {{amount}} {{symbol}} to StarkNet...'
      },
      initiateWithdraw: {
        type: 'Initiate transfer',
        message: 'Initiating transfer of {{amount}} {{symbol}} from StarkNet...'
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
      complianceTxt:
        'If you believe this is an error, please send an email including your address to',
      closeButtonTxt: 'Close'
    }
  },
  toasts: {
    alphaDisclaimerNotice: {
      titleTxt: 'StarkNet Alpha',
      bodyTxt:
        'This is an ALPHA version of StarkNet, and its Bridge. As such, delays may occur, and catastrophic bugs may lurk. Thanks, OGs, for trying it at this early stage.'
    },
    transferLogLink: 'View on Transfer Log',
    pendingTransfer: {
      pendingTxt: 'Waiting for transaction to be accepted on StarkNet',
      consumedTxt: 'Transaction accepted on StarkNet',
      rejectedTxt: 'Transaction rejected on StarkNet'
    },
    completeTransfer: {
      titleTxt: 'StarkNet finished processing your transfer!',
      bodyTxt:
        'Click on Complete Transfer to transfer the funds from StarkNet Bridge to your Ethereum address.',
      dismissBtnTxt: 'Dismiss',
      completeTransferBtnTxt: 'Complete Transfer'
    }
  }
};
