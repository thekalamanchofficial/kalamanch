"use client";
import { Grid2 as Grid, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import mockData from "./myfeedMock/myfeedMock";
import PostsFeed from "~/app/_components/postsFeed/PostsFeed";
const MyFeed = () => {
  const [tab, setTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent) => {
    setTab(1 - tab);
  };

  return (
    <>
      <Grid
        size={12}
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "start",
          px: "4px",
          pt: "8px",
          borderBottom: "1px solid #E0E0E0",
        }}
      >
        <Tabs
          value={tab}
          onChange={handleChange}
          sx={{
            borderColor: "divider",
            "& .MuiTab-root": {
              fontSize: "16px",
              minHeight: "auto",
              height: "50px",
              marginRight: "10px",
              paddingBottom: "2px",
              textTransform: "none",
            },
            "& .MuiTab-textColorPrimary.Mui-selected": {
              color: "primary.main",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "primary.main",
              height: "2px",
            },
          }}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="My Feed" />
          <Tab label="Discover" />
        </Tabs>
      </Grid>
      <Grid
        size={12}
        sx={{
          overflowY: "scroll",
          height: "100%",
          scrollbarWidth: "none",
          mt: 1,
          pl: 1,
        }}
      >
        {tab === 0 ? (
          <PostsFeed articlesList={mockData.articlesList} />
        ) : (
          <div
            style={{
              padding: "10px",
            }}
          >
            Discover Tab
          </div>
        )}
      </Grid>
    </>
  );
};

export default MyFeed;
