import { Box, Skeleton, Grid2 as Grid } from "@mui/material";
import React from "react";

const RightSideBarSkeletonPost = () => {
  return Array.from({ length: 5 }).map((_, index) => (
    <Grid
      size={12}
      key={index}
      sx={{
        marginBottom: "10px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
          pt: "3px",
        }}
      >
        <Skeleton
          sx={{
            width: "70%",
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            py: "8px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              gap: "10px",
            }}
          >
            <Skeleton
              variant="circular"
              sx={{
                height: "20px",
                width: "20px",
              }}
            />
            <Skeleton
              variant="text"
              sx={{
                width: "100px",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Grid>
  ));
};

export default RightSideBarSkeletonPost;
