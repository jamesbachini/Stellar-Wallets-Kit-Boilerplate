import './App.css';
import React, { useEffect, useRef, useState } from 'react';

import { StellarWalletsKit } from "@creit-tech/stellar-wallets-kit/sdk";
import { SwkAppDarkTheme, KitEventType } from "@creit-tech/stellar-wallets-kit/types";
import { defaultModules } from '@creit-tech/stellar-wallets-kit/modules/utils';
import * as StellarSdk from '@stellar/stellar-sdk';

StellarWalletsKit.init({
  theme: SwkAppDarkTheme,
  modules: defaultModules(),
});


function App() {
    const [walletAddress, setWalletAddress] = useState('Disconnected');
    const [explorerLink, setExplorerLink] = useState('');
    const buttonWrapperRef = useRef(null);
    
    useEffect(() => {
        const buttonWrapper = buttonWrapperRef.current;
        if (buttonWrapper) {
          StellarWalletsKit.createButton(buttonWrapper);
        }
        
        StellarWalletsKit.on(KitEventType.STATE_UPDATED, event => {
          console.log('EVENT LOG: ', event, event.payload.address);
          setWalletAddress(event.payload.address || 'Disconnected');
        });
    }, []); 

    const sendTx = async () => {
      try {
        const DESTINATION_ADDRESS = 'GB5AT3W7YT5OOF7HFDIFRM6AS2HXQF7QOL47ZHMGETN4P63476Z6DQ43';
        const { address } = await StellarWalletsKit.getAddress();
        const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');
        const sourceAccount = await server.loadAccount(address);
        const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
          fee: StellarSdk.BASE_FEE,
          networkPassphrase: StellarSdk.Networks.TESTNET
        })
          .addOperation(
            StellarSdk.Operation.payment({
              destination: DESTINATION_ADDRESS,
              asset: StellarSdk.Asset.native(),
              amount: '1'
            })
          )
          .setTimeout(180)
          .build();
        const {signedTxXdr} = await StellarWalletsKit.signTransaction(transaction.toXDR(), {
          networkPassphrase: StellarSdk.Networks.TESTNET,
          address,
        });
        const transactionToSubmit = StellarSdk.TransactionBuilder.fromXDR(
          signedTxXdr,
          StellarSdk.Networks.TESTNET
        );
        const response = await server.submitTransaction(transactionToSubmit);
        console.log('Transaction successful!', response);
        const blockExplorer = `https://stellar.expert/explorer/testnet/tx/${response.hash}`;
        setExplorerLink(blockExplorer);
        alert(`Transaction sent successfully!`);
      } catch (error) {
        console.error('Transaction failed:', error);
        alert('Transaction failed: ' + error.message);
      }
    }

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-address">{walletAddress}</div>
        <div ref={buttonWrapperRef} id="buttonWrapper"></div>
        <button onClick={sendTx}>Send Test Tx</button>
        <div className="App-explorer-link">
          <a href={explorerLink} target="_blank" rel="noopener noreferrer">
            {explorerLink}
          </a>
        </div>
        
      </header>
    </div>
  );
}

export default App;