import { useEffect, useState } from "react";
import Head from "next/head";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Unity, useUnityContext } from "react-unity-webgl";
import { AuthGuard } from "../../components/authentication/auth-guard";
import { DashboardLayout } from "../../components/play/dashboard-layout";
import { OverviewBanner } from "../../components/play/overview/overview-banner";
import { OverviewCryptoWallet } from "../../components/play/overview/overview-crypto-wallet";
import { OverviewInbox } from "../../components/play/overview/overview-inbox";
import { OverviewLatestTransactions } from "../../components/play/overview/overview-latest-transactions";
import { OverviewPrivateWallet } from "../../components/play/overview/overview-private-wallet";
import { OverviewTotalBalance } from "../../components/play/overview/overview-total-balance";
import { OverviewTotalTransactions } from "../../components/play/overview/overview-total-transactions";
import { WidgetPreviewer } from "../../components/widget-previewer";
import { Table6 } from "../../components/widgets/tables/table-6";
import { ArrowRight as ArrowRightIcon } from "../../icons/arrow-right";
import { Briefcase as BriefcaseIcon } from "../../icons/briefcase";
import { Download as DownloadIcon } from "../../icons/download";
import { ExternalLink as ExternalLinkIcon } from "../../icons/external-link";
import { InformationCircleOutlined as InformationCircleOutlinedIcon } from "../../icons/information-circle-outlined";
import { Reports as ReportsIcon } from "../../icons/reports";
import { Users as UsersIcon } from "../../icons/users";
import { gtm } from "../../lib/gtm";

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
    gtm.push({ event: "page_view" });
  }, []);

  useEffect(() => {
    // Restore the persistent state from local/session storage
    const value = globalThis.sessionStorage.getItem("dismiss-banner");

    if (value === "true") {
      // setDisplayBanner(false);
    }
  }, []);

  const handleDismissBanner = () => {
    // Update the persistent state
    // globalThis.sessionStorage.setItem('dismiss-banner', 'true');
    setDisplayBanner(false);
  };

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
            <CardContent>
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
            </CardContent>
          </Card>
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <WidgetPreviewer
                element={<Table6 />}
                name="Table with search bar and select box"
              />
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

Play.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default Play;
