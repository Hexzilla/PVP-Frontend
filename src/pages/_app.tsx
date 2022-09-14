import React from 'react';
import { AppProps } from 'next/app';
import '../styles/globals.css'
import { NetworkOptions, TezosProvider } from '../contexts/TezosContext';

const options = {
  appName: 'PiXL',
  networkType: 'jakartanet',
  rpc: 'https://jakartanet.tezos.marigold.dev',
} as NetworkOptions;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TezosProvider options={options}>
      <Component {...pageProps} />
    </TezosProvider>
  )
}

export default MyApp
