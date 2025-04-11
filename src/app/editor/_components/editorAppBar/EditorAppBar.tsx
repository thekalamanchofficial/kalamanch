"use client";

import React, { useState } from "react";
import { GppBadOutlined } from "@mui/icons-material";
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  CircularProgress,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { type DraftPost } from "../../types/types";
import EditorLeftSideBarForIterations from "../editorLeftSideBar/EditorLeftSideBarForIterations";
import EditorRightSideBar from "../editorRightSideBar/EditorRightSideBar";
import { type EvaluationResult } from "../evaluator/types/types";

type EditorAppBarProps = {
  draftPost: DraftPost | null;
  handleSaveLastIterationData: () => void;
  handleAddIteration: (content?: string) => void;
  handleIterationSelected: (iterationId: string) => void;
  selectedIterationId: string;
  handleImportText: () => void;
  evaluationResult: EvaluationResult[];
  evaluationType: string | null;
  isEvaluating?: boolean;
  isEvaluationError?: boolean;
  isEvaluationFetched?: boolean;
};
export const EditorAppBar: React.FC<EditorAppBarProps> = ({
  draftPost,
  handleSaveLastIterationData,
  handleAddIteration,
  handleIterationSelected,
  selectedIterationId,
  handleImportText,
  evaluationResult,
  evaluationType,
  isEvaluating,
  isEvaluationError,
  isEvaluationFetched,
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
        {/* TODO:  Simplify this code to a function which returns the ui based on the conditions */}
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
          {isEvaluating ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <CircularProgress />
            </Box>
          ) : null}
          {isEvaluationError ? (
            <Box
              sx={{
                width: "100%",
                height: "90vh",
                spacing: 3,
                backgroundColor: "white",
                position: "relative",
                py: 10,
                display: "flex",
                textAlign: "center",
              }}
            >
              <GppBadOutlined color="error" />
              <Typography variant="body1" color="error">
                Error occurred while evaluating
              </Typography>
            </Box>
          ) : null}
          {!evaluationType && isEvaluationFetched && evaluationResult?.length === 0 ? (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                spacing: 3,
                backgroundColor: "white",
                position: "relative",
                py: 10,
                px: 3,
                display: "flex",
                textAlign: "center",
                maxHeight: "700px",
              }}
            >
              <Typography variant="body1" color="primary.main">
                Writing type is not detected. Please try again.
              </Typography>
            </Box>
          ) : null}
          {!isEvaluating &&
          !isEvaluationError &&
          !isEvaluationFetched &&
          !evaluationResult?.length ? (
            <Box
              sx={{
                width: "100%",
                height: "90vh",
                spacing: 3,
                backgroundColor: "white",
                position: "relative",
                py: 10,
                display: "flex",
                textAlign: "center",
              }}
            >
              <Typography variant="body1" color="primary">
                Click evaluate to analyse your content
              </Typography>
            </Box>
          ) : null}
          {!isEvaluating && !isEvaluationError && evaluationResult?.length ? (
            <EditorRightSideBar
              evaluationResult={evaluationResult}
              evaluationType={evaluationType}
            />
          ) : null}
        </Drawer>
      </>
    </>
  );
};
