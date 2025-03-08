"use client";

import { memo } from "react";
import { alpha, Box, Fade, Grid2 as Grid, Paper, Skeleton, Stack, useTheme } from "@mui/material";

const SearchLoading = memo(() => {
  const theme = useTheme();

  return (
    <Grid size={12}>
      <Fade in timeout={800}>
        <Paper
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            backgroundColor: alpha(theme.palette.background.paper, 0.6),
            backdropFilter: "blur(10px)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <Skeleton variant="circular" width={32} height={32} sx={{ mr: 2 }} />
            <Skeleton width={200} height={32} />
          </Box>

          <Stack spacing={4}>
            {[1, 2, 3].map((item) => (
              <Box key={item}>
                <Box sx={{ display: "flex", mb: 2 }}>
                  <Skeleton variant="circular" width={48} height={48} sx={{ mr: 2 }} />
                  <Box sx={{ width: "100%" }}>
                    <Skeleton width="60%" height={24} sx={{ mb: 1 }} />
                    <Skeleton width="40%" height={20} />
                  </Box>
                </Box>
                <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 2, mb: 1 }} />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Skeleton width={100} height={36} />
                  <Skeleton width={100} height={36} />
                </Box>
              </Box>
            ))}
          </Stack>
        </Paper>
      </Fade>
    </Grid>
  );
});

SearchLoading.displayName = "SearchLoading";

export default SearchLoading;
