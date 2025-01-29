import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Typography,
  Drawer,
} from "@mui/material";
import React, { useState } from "react";
import { type IterationWithReviews } from "~/app/(with-sidebar)/myfeed/types/types";
import LeftSideBarForPosts from "~/app/_components/leftSideBarForPosts/LeftSideBarForPosts";
import { type PostEntityType } from "~/app/editor/types/types";
import MenuIcon from "@mui/icons-material/Menu";

type ReviewFeedbackAppBarProps = {
  draftIterationsSentForReview: IterationWithReviews[];
  entityType: PostEntityType;
};

export const ReviewFeedbackAppBar: React.FC<ReviewFeedbackAppBarProps> = ({
  draftIterationsSentForReview,
  entityType,
}) => {
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);

  const toggleMenuDrawer = (open: boolean) => {
    setMenuDrawerOpen(open);
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
              Review feedback
            </Typography>
          </Box>
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
          <LeftSideBarForPosts
            draftPosts={[]}
            publishedPosts={[]}
            entityType={entityType}
            draftIterationsSentForReview={draftIterationsSentForReview}
          />
        </Drawer>
      </>
    </>
  );
};
