import React from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from '@mui/material/styles';
import "../styles/globals.css";
import { createTheme } from '../theme';
import { NetworkOptions, TezosProvider } from "../contexts/TezosContext";

const options = {
  appName: "PiXL",
  networkType: "jakartanet",
  rpc: "https://jakartanet.tezos.marigold.dev",
} as NetworkOptions;

const App = (props: AppProps) => {
  const { Component, pageProps } = props;

  const getLayout = Component['getLayout'] ?? ((page) => page);

  return (
    <ThemeProvider
      theme={createTheme({
        direction: 'ltr',
        responsiveFontSizes: true,
        mode: 'dark',
      })}
    >
      <TezosProvider options={options}>
        {getLayout(<Component {...pageProps} />)}
      </TezosProvider>
    </ThemeProvider>
  );
}

export default App;
