"use client";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Typography,
  Drawer,
} from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined";
import { usePathname } from "next/navigation";
import EditorRightSideBar from "../editorRightSideBar/EditorRightSideBar";
import editorMockData from "../../mockDataEditor/mockdata";
import { type Post } from "~/app/(with-sidebar)/myfeed/types/types";
import LeftSideBarForPosts from "~/app/_components/leftSideBarForPosts/LeftSideBarForPosts";
import {
  type DraftPost,
  EditorTabsEnum,
  PostEntityType,
} from "../../types/types";
import EditorLeftSideBarForIterations from "../editorLeftSideBar/EditorLeftSideBarForIterations";

type EditorAppBarProps = {
  activeTab: EditorTabsEnum;
  publishedPosts: Post[];
  draftPost: DraftPost | null;
  handleSaveLastIterationData: () => void;
  handleAddIteration: (iterationName: string) => void;
  handleIterationSelected: (iterationId: string) => void;
  selectedIterationId: string;
};
export const EditorAppBar: React.FC<EditorAppBarProps> = ({
  activeTab,
  publishedPosts,
  draftPost,
  handleSaveLastIterationData,
  handleAddIteration,
  handleIterationSelected,
  selectedIterationId,
}) => {
  const pathname = usePathname();
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
          {activeTab === EditorTabsEnum.PUBLISHED && (
            <LeftSideBarForPosts
              draftPosts={[]}
              draftIterationsSentForReview={[]}
              publishedPosts={publishedPosts}
              entityType={PostEntityType.PUBLISHED_POST}
            />
          )}
          {activeTab === EditorTabsEnum.EDITOR && (
            <EditorLeftSideBarForIterations
              showIterations={Boolean(draftPost)}
              iterations={draftPost?.iterations ?? []}
              handleSaveLastIterationData={handleSaveLastIterationData}
              handleAddIteration={handleAddIteration}
              handleIterationSelected={handleIterationSelected}
              selectedIterationId={selectedIterationId}
            />
          )}
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
