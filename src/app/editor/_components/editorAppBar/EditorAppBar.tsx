"use client";

import React, { useState } from "react";
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import editorMockData from "../../mockDataEditor/mockdata";
import { type DraftPost } from "../../types/types";
import EditorLeftSideBarForIterations from "../editorLeftSideBar/EditorLeftSideBarForIterations";
import EditorRightSideBar from "../editorRightSideBar/EditorRightSideBar";

type EditorAppBarProps = {
  draftPost: DraftPost | null;
  handleSaveLastIterationData: () => void;
  handleAddIteration: (content?: string) => void;
  handleIterationSelected: (iterationId: string) => void;
  selectedIterationId: string;
  handleImportText: () => void;
};
export const EditorAppBar: React.FC<EditorAppBarProps> = ({
  draftPost,
  handleSaveLastIterationData,
  handleAddIteration,
  handleIterationSelected,
  selectedIterationId,
  handleImportText,
}) => {
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);
  const [featuredDrawerOpen, setFeaturedDrawerOpen] = useState(false);

  const toggleMenuDrawer = (open: boolean) => {
    setMenuDrawerOpen(open);
  };
  const toggleFeaturedDrawer = (open: boolean) => {
    setFeaturedDrawerOpen(open);
  };

  return (
    <>
      <AppBar
        position="fixed"
        color="secondary"
        sx={{
          boxShadow: "none",
          display: { xs: "flex", sm: "flex", md: "none", lg: "none" },
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="primary"
            aria-label="menu"
            onClick={() => toggleMenuDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              flexGrow: 1,
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "1.2rem",
            }}
          >
            <Typography variant="h3" color="primary">
              Editor
            </Typography>
          </Box>
          <IconButton
            edge="start"
            color="primary"
            aria-label="menu"
            onClick={() => toggleFeaturedDrawer(true)}
          >
            <FeaturedPlayListOutlinedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <>
        <Drawer
          anchor="left"
          open={menuDrawerOpen}
          onClose={() => toggleMenuDrawer(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: 240,
            },
            display: { xs: "flex", sm: "flex", md: "none", lg: "none" },
          }}
        >
          <EditorLeftSideBarForIterations
            showIterations={Boolean(draftPost)}
            showImportText={Boolean(draftPost)}
            iterations={draftPost?.iterations ?? []}
            handleSaveLastIterationData={handleSaveLastIterationData}
            handleAddIteration={handleAddIteration}
            handleIterationSelected={handleIterationSelected}
            selectedIterationId={selectedIterationId}
            handleImportText={handleImportText}
          />
        </Drawer>
        <Drawer
          anchor="right"
          open={featuredDrawerOpen}
          onClose={() => toggleFeaturedDrawer(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: 240,
              paddingRight: "12px",
            },
          }}
        >
          <EditorRightSideBar accuracy={editorMockData.accuracy} />
        </Drawer>
      </>
    </>
  );
};
