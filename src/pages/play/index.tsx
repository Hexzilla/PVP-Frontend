import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Box, Button, Card, CardContent, Container } from "@mui/material";
import { Unity, useUnityContext } from "react-unity-webgl";
import { DashboardLayout } from "../../components/play/dashboard-layout";
//import { WidgetPreviewer } from "../../components/widget-previewer";
//import { Table6 } from "../../components/widgets/tables/table-6";

const unityConfig = {
  loaderUrl: "Build/public.loader.js",
  dataUrl: "Build/public.data.unityweb",
  frameworkUrl: "Build/public.framework.js.unityweb",
  codeUrl: "Build/public.wasm.unityweb",
};

const Play = () => {
  const unityContext = useUnityContext(unityConfig);
  const { sendMessage, addEventListener, removeEventListener } = unityContext;
  const [displayBanner, setDisplayBanner] = useState(true);

  useEffect(() => {
    // Restore the persistent state from local/session storage
    const value = globalThis.sessionStorage.getItem("dismiss-banner");

    if (value === "true") {
      // setDisplayBanner(false);
    }
  }, []);

  const handleJoin = () => {

  }

  return (
    <>
      <Head>
        <title>Dashboard: Overview | Material Kit Pro</title>
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
              <Button
                type="submit"
                variant="contained"
                onClick={handleJoin}
              >
                Sign & Join 
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
