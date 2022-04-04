const strings = {
  containers: {
    header: {
      chain_txt: '{{chainName}} testnet',
      wallet_btn_txt: 'Account | {{address}}',
      tab_discord_txt: 'Discord',
      tab_faq: 'FAQ'
    },
    footer: {
      rights_txt: '© 2022 StarkWare Industries Ltd. All Rights Reserved'
    }
  },
  menus: {
    back_btn_txt: 'Back',
    login: {
      title_txt: 'Login',
      subtitle_txt: 'Please select {{networkName}} wallet to connect with this dApp:',
      download_txt: ['Don’t have a wallet?', 'Download Here'],
      modal_txt: 'Waiting for confirmation from {{walletName}}',
      unsupported_browser_txt:
        "Note - The current version of StarkGate (Alpha) doesn't support your browser. Use Chrome to connect."
    },
    account: {
      title_txt: '{{network}} Account',
      copied_msg_txt: 'Copied!',
      logout_btn_txt: 'Logout',
      transferLogContainer: {
        title_txt: 'Transfers log',
        overview_txt: 'recent transfers',
        empty_msg_txt: 'Transfers will appear here...',
        view_more_txt: 'View more',
        transferLog: {
          complete_transfer_btn_txt: 'Complete transfer'
        }
      }
    },
    selectToken: {
      title_txt: 'Select token from:',
      search_placeholder: 'Token name, symbol, or address'
    },
    transfer: {
      to_txt: 'to',
      from_txt: 'from',
      insufficient_balance_error_msg: 'Insufficient balance',
      max_deposit_error_msg:
        'You have exceeded the maximum transfer amount. Please reduce the amount and try again.',
      max_btn_txt: 'Max',
      balance_title_txt: 'Available balance',
      input_placeholder_txt: '0.00',
      transfer_btn_txt: 'Transfer'
    },
    faq: {
      title_txt: 'FAQ'
    }
  },
  modals: {
    transactionSubmitted: {
      title_txt: 'Transaction sent',
      btn_txt: 'View on {{explorer}}',
      transfer_to_l1_txt: 'Your transaction is now being processing on StarkNet.',
      transfer_to_l2_txt: 'Your transaction has been successfully sent to StarkNet!',
      complete_transfer_to_l1_txt: 'Your transfer is completed on Ethereum!'
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
      confirm_txt: 'Confirm this transaction in your wallet',
      max_total_balance_error_msg:
        'We have reached the upper limit of the amount we allow the bridge to hold at this point so it is not possible to use the token you have chosen now.\n\nPlease try later or use another token.',
      error_title: 'Transaction error',
      limitation_error_title: 'Limitation error'
    },
    onboarding: {
      title_txt: 'Before takeoff, a few important notes!',
      subtitle_txt: 'While using StarkGate Alpha:',
      bullets_txt: [
        'Use Google Chrome',
        'Refrain from switching browsers',
        'Do not refresh the page while the transfer is being processed',
        'Do not delete the local storage of the browser'
      ]
    }
  },
  toasts: {
    alpha_disclaimer_msg:
      'This is an ALPHA version of StarkNet, and its Bridge. As such, delays may occur, and catastrophic bugs may lurk. Thanks, OGs, for trying it at this early stage.',
    transfer_log_link: 'View on Transfer Log',
    pendingTransfer: {
      pending_txt: 'Waiting for transaction to be accepted on StarkNet',
      consumed_txt: 'Transaction accepted on StarkNet',
      rejected_txt: 'Transaction rejected on StarkNet'
    },
    completeTransfer: {
      title_txt: 'StarkNet finished processing your transfer!',
      body_txt:
        'Click on Complete Transfer to transfer the funds from StarkNet Bridge to your Ethereum address.',
      dismiss_btn_txt: 'Dismiss',
      complete_transfer_btn_txt: 'Complete Transfer'
    }
  }
};

export default strings;
