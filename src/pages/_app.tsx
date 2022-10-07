import React from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import "../styles/globals.css";
import { createTheme } from '../theme';
import { PhantomProvider } from "../contexts/PhantomContext";

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
      <ToastContainer position="top-center" hideProgressBar/>
      <PhantomProvider>
        {getLayout(<Component {...pageProps} />)}
      </PhantomProvider>
    </ThemeProvider>
  );
}

export default App;
