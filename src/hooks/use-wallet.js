import { useCallback } from "react";
import { PermissionScope } from "@airgap/beacon-sdk";
import { useTezosContext } from "./use-tezos-context";

const useWallet = () => {
  const {
    wallet,
    options,
    walletAddress,
    setWalletAddress,
    publicKey,
    setPublicKey,
  } = useTezosContext();

  const connectWallet = useCallback(() => {
    return wallet.client
      .requestPermissions({
        network: {
          type: options.networkType,
          rpcUrl: options.rpc,
        },
        scopes: [PermissionScope.OPERATION_REQUEST, PermissionScope.SIGN],
      })
      .then((permission) => {
        console.log("permission", permission);
        setPublicKey(permission.accountInfo.publicKey);
        setWalletAddress(permission.address);
        return permission.address;
      });
  }, [wallet, options, setWalletAddress, setPublicKey]);

  const disconnectWallet = async () => {
    setWalletAddress(undefined);
  };

  const requestSignPayload = (messagePayload) => {
    return wallet.client.requestSignPayload(messagePayload);
  };

  return {
    connectWallet,
    disconnectWallet,
    walletAddress,
    publicKey,
    requestSignPayload,
  };
};

export default useWallet;
