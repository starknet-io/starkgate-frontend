export default {
  containers: {
    header: {
      chainTxt: 'Goerli testnet',
      accountWalletBtnTxt: '{{address}}',
      connectWalletBtnTxt: 'Connect {{network}} Wallet',
      tabDiscordTxt: 'Discord',
      tabLiquidityTxt: 'Deposit into L2',
      burgerMenu: {
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
    },
    liquidity: {
      titleTxt: 'Deposit into L2'
    }
  },
  menus: {
    backBtnTxt: 'Back',
    login: {
      titleTxt: 'Login',
      subtitleTxt: 'Please select {{networkName}} wallet to connect with this dApp:',
      downloadTxt: ['Don’t have a wallet?', 'Download Here'],
      modalTxt: 'Waiting for confirmation from {{walletName}}',
      unsupportedChainIdTxt: 'Please select {{chainName}} in your wallet',
      unsupportedBrowserTxt:
        "Note - The current version of StarkGate (Alpha) doesn't support your browser. Use Chrome or Firefox to connect."
    },
    account: {
      titleTxt: '{{network}} Account',
      copiedMsgTxt: 'Copied!',
      logoutBtnTxt: 'Logout',
      transferLogContainer: {
        titleTxt: 'Transfers log',
        overviewTxt: 'recent transfers',
        emptyMsgTxt: 'Transfers will appear here...',
        viewMoreTxt: 'View more',
        transferLog: {
          completeTransferBtnTxt: 'Complete transfer'
        }
      }
    },
    selectToken: {
      titleTxt: 'Select token from:',
      searchPlaceholder: 'Token name, symbol, or address'
    },
    transfer: {
      toTxt: 'to',
      fromTxt: 'from',
      negativeValueErrorMsg: 'Amount must be a positive number',
      tooManyDigitsErrorMsg: 'Too many decimal places',
      insufficientBalanceErrorMsg: 'Insufficient balance',
      maxDepositErrorMsg:
        'You have exceeded the maximum transfer amount ({{maxDeposit}} {{symbol}}). Please reduce the amount and try again.',
      maxBtnTxt: 'Max',
      balanceTitleTxt: 'Available balance',
      inputPlaceholderTxt: '0.00',
      transferBtnTxt: 'Transfer'
    }
  },
  modals: {
    transactionSubmitted: {
      titleTxt: 'Transaction sent',
      btnTxt: 'View on {{explorer}}',
      transferToL1Txt: 'Your transaction is now being processing on StarkNet.',
      transferToL2Txt: 'Your transaction has been successfully sent to StarkNet!',
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
        type: '{{walletName}}',
        message: 'Waiting for confirmation from {{walletName}}'
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
      ]
    }
  },
  toasts: {
    bridgeFullNotice: {
      titleTxt: 'Bridge is full',
      bodyTxt:
        'We have reached the upper limit of the amount we allow the bridge to hold at this point so it is not possible to use the token you have chosen now.\n\nPlease try later or use another token.'
    },
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
