"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Container, IconButton, Paper, Tab, Tabs, Typography, useTheme } from "@mui/material";
import Loader from "~/app/_components/loader/Loader";
import { trpc } from "~/app/_trpc/client";
import { useUser } from "~/context/userContext";
import FollowersList from "./_components/FollowersList";
import FollowingList from "./_components/FollowingList";

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`connections-tabpanel-${index}`}
      aria-labelledby={`connections-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
    </Box>
  );
}

export default function ConnectionsPage() {
  const theme = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = React.useState(0);
  const { user: currentUser } = useUser();

  const { data: user, isLoading: isUserLoading } = trpc.user.getUserDetailsById.useQuery(
    currentUser?.id ?? "",
  );

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    router.replace(`/connections?tab=${newValue}`);
  };

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setValue(parseInt(tab));
    }
  }, [searchParams]);

  if (isUserLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          width: "100%",
        }}
      >
        <Loader height="100px" width="100px" />
      </Box>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              px: 2,
              py: 1,
              borderBottom: `1px solid ${theme.palette.divider}`,
            }}
          >
            <IconButton
              onClick={() => router.back()}
              sx={{
                mr: 2,
                color: theme.palette.text.secondary,
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
                "&.MuiButtonBase-root": {
                  minHeight: 32,
                },
              }}
              aria-label="Go back"
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              Connections
            </Typography>
          </Box>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="connections tabs"
            sx={{
              px: 2,
              "& .MuiTabs-indicator": {
                backgroundColor: theme.palette.primary.main,
                height: 3,
              },
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 500,
                minHeight: 48,
              },
            }}
          >
            <Tab
              label={`Following (${user.following.length})`}
              id="connections-tab-0"
              aria-controls="connections-tabpanel-0"
            />
            <Tab
              label={`Followers (${user.followers.length})`}
              id="connections-tab-1"
              aria-controls="connections-tabpanel-1"
            />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <FollowingList userId={user.id} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FollowersList userId={user.id} />
        </TabPanel>
      </Paper>
    </Container>
  );
}
