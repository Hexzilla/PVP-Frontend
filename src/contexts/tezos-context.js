import React, { useMemo, useState } from "react";
import PropTypes from 'prop-types';
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { BeaconEvent, defaultEventCallbacks } from "@airgap/beacon-sdk";

const initialState = {
  tezos: null,
  wallet: null,
  options: null,
  walletAddress: null,
  publicKey: null,
};

const TezosContext = React.createContext({
  ...initialState,
  setWalletAddress: (address) => Promise.resolve(),
  setPublicKey: (publicKey) => Promise.resolve(),
});

if (process.env.NODE_ENV !== "production") {
  TezosContext.displayName = "TezosContext";
}

export const TezosProvider = ({ options, children }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [publicKey, setPublicKey] = useState(null);

  const contextValue = useMemo(() => {
    const tezos = new TezosToolkit(options.rpc);
    const wallet = new BeaconWallet({
      name: options.appName,
      preferredNetwork: options.networkType,
      disableDefaultEvents: true, // Disable all events / UI. This also disables the pairing alert.
      eventHandlers: {
        // To keep the pairing alert, we have to add the following default event handlers back
        [BeaconEvent.PAIR_INIT]: {
          handler: defaultEventCallbacks.PAIR_INIT,
        },
        [BeaconEvent.PAIR_SUCCESS]: {
          handler: (data) => console.log(data.publicKey),
        },
      },
    });
    tezos.setWalletProvider(wallet);
    return {
      tezos,
      wallet,
      options,
    };
  }, [options]);

  return (
    <TezosContext.Provider
      value={{
        ...contextValue,
        walletAddress,
        setWalletAddress,
        publicKey,
        setPublicKey,
      }}
    >
      {children}
    </TezosContext.Provider>
  );
}

TezosProvider.propTypes = {
  children: PropTypes.node.isRequired
};
