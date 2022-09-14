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

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      theme={createTheme({
        direction: 'ltr',
        responsiveFontSizes: true,
        mode: 'dark',
      })}
    >
      <TezosProvider options={options}>
        <Component {...pageProps} />
      </TezosProvider>
    </ThemeProvider>
  );
}

export default MyApp;
