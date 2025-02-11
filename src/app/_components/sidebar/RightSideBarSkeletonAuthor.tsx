import React from "react";
import { Box, Grid2 as Grid, Skeleton } from "@mui/material";

const RightSideBarSkeletonAuthor = () => {
  return Array.from({ length: 5 }).map((_, index) => (
    <Grid
      key={index}
      size={12}
      spacing={1}
      container
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
      }}
    >
      <Skeleton
        variant="circular"
        sx={{
          height: "40px",
          width: "40px",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
        }}
      >
        <Skeleton
          sx={{
            borderRadius: "5px",
            width: "50px",
            px: "12px",
            py: "4px",
          }}
        />
        <Skeleton
          sx={{
            borderRadius: "5px",
            width: "30px",
            px: "12px",
            py: "4px",
          }}
        />
      </Box>
    </Grid>
  ));
};

export default RightSideBarSkeletonAuthor;
