import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useWallet } from "@solana/wallet-adapter-react";
import { Box, Button, Card, CardContent, Container } from "@mui/material";
import { io } from "socket.io-client";
import { Unity, useUnityContext } from "react-unity-webgl";
import { DashboardLayout } from "../../components/play/dashboard-layout";
import useInterval from "hooks/useInterval";

const socket = io("http://localhost:8000");

const unityConfig = {
  loaderUrl: "Build/public.loader.js",
  dataUrl: "Build/public.data.unityweb",
  frameworkUrl: "Build/public.framework.js.unityweb",
  codeUrl: "Build/public.wasm.unityweb",
};

const Play = () => {
  const wallet = useWallet();
  const unityContext = useUnityContext(unityConfig);
  const { sendMessage, addEventListener, removeEventListener } = unityContext;
  const [displayBanner, setDisplayBanner] = useState(true);
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    // Restore the persistent state from local/session storage
    const value = globalThis.sessionStorage.getItem("dismiss-banner");
    if (value === "true") {
      // setDisplayBanner(false);
    }
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
      setIsConnected(false);
    });

    socket.on("PONG", () => {
      console.log("PONG");
    });

    socket.connect();

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("PONG");
    };
  }, []);

  const sendPing = () => {
    socket.emit("PING");
  };

  useInterval(() => {
    sendPing();
  }, 5000);

  const handleJoin = async () => {
    /*// The data to format
    const dappUrl = "Pixltez.app";
    const ISO8601formatedTimestamp = new Date().toISOString();
    const input = "Hello world!";

    // The full string
    const formattedInput: string = [
      "Tezos Signed Message:",
      dappUrl,
      ISO8601formatedTimestamp,
      input,
    ].join(" ");

    const bytes = char2Bytes(formattedInput);
    const payloadBytes = "05" + "0100" + char2Bytes("" + bytes.length) + bytes;

    const payload: RequestSignPayloadInput = {
      signingType: SigningType.MICHELINE,
      payload: payloadBytes,
      sourceAddress: walletAddress,
    };
    const signedPayload = await requestSignPayload(payload);
    console.log("signedPayload", signedPayload);*/

    const publicKey = wallet.publicKey;
		if (!publicKey) {
      console.log("No key associated with the wallet");
			return;
		}

    const encoder = new TextEncoder();
		const message = publicKey.toString();

    if (!wallet.signMessage) {
      console.log("Unable to sign using this wallet");
			return;
		}

		const signed = await wallet.signMessage(encoder.encode(message));
    console.log('signed', signed)
  };

  return (
    <>
      <Head>
        <title>Play</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Card>
            <CardContent sx={{ display: "flex", justifyContent: "center" }}>
              <Unity
                unityProvider={unityContext.unityProvider}
                style={{
                  height: 540,
                  width: 950,
                  background: "#555",
                }}
              />
            </CardContent>
          </Card>
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Button type="submit" variant="contained" onClick={handleJoin}>
                {"Sign & Join"}
              </Button>
            </CardContent>
          </Card>
          <Card sx={{ mt: 3 }}>
            <CardContent>
              {/* <WidgetPreviewer
                element={<Table6 />}
                name="Table with search bar and select box"
              /> */}
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

Play.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Play;
