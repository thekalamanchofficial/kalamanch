"use client";
import React, { useState } from "react";
import { WritingPad } from "../_components/writingPad/writingPad";
import { Box, Grid2 as Grid } from "@mui/material";
import CustomTabs from "../_components/CustomTabs/CustomTabs";
import { tabs } from "./_config/config";
import { EditorTabsEnum } from "./types/types";

const Page = () => {
  const [tab, setTab] = useState(EditorTabsEnum.EDITOR);

  const handleChange = (newTab: EditorTabsEnum) => {
    setTab(newTab);
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
      }}
    >
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
        <CustomTabs tabs={tabs} activeTab={tab} onTabChange={handleChange} />
      </Grid>
      <Grid
        size={12}
        sx={{
          height: "100%",
          width: "100%",
          overflowY: "scroll",
          scrollbarWidth: "none",
        }}
      >
        <WritingPad />
      </Grid>
    </Box>
  );
};

export default Page;
