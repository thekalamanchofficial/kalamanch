import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Typography,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { type PostEntityType, type DraftPost } from "~/app/editor/types/types";
import {
  type IterationWithReviews,
} from "~/app/(with-sidebar)/myfeed/types/types";
import LeftSideBarForPosts from "~/app/_components/leftSideBarForPosts/LeftSideBarForPosts";

type DraftAppBarProps = {
  draftPosts: DraftPost[];
  draftIterationsSentForReview: IterationWithReviews[];
  entityType: PostEntityType;
};

export const DraftAppBar: React.FC<DraftAppBarProps> = ({
  draftPosts,
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
              Your drafts
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
            draftPosts={draftPosts}
            entityType={entityType}
            draftIterationsSentForReview={draftIterationsSentForReview}
          />
        </Drawer>
      </>
    </>
  );
};
