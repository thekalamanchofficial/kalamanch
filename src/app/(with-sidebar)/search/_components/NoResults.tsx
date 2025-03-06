"use client";

import { memo } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import {
  alpha,
  Box,
  Button,
  Grid2 as Grid,
  Paper,
  Stack,
  Typography,
  useTheme,
  Zoom,
} from "@mui/material";

type NoResultsProps = {
  searchQuery: string;
};

const NoResults = memo(({ searchQuery }: NoResultsProps) => {
  const theme = useTheme();

  return (
    <Zoom in timeout={500}>
      <Grid size={12}>
        <Paper
          sx={{
            p: { xs: 4, md: 6 },
            textAlign: "center",
            borderRadius: 3,
            backgroundColor: alpha(theme.palette.background.paper, 0.6),
            backdropFilter: "blur(10px)",
            border: `1px dashed ${alpha(theme.palette.divider, 0.5)}`,
          }}
        >
          <Zoom in timeout={800}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px auto",
              }}
            >
              <SearchIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
            </Box>
          </Zoom>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: "text.primary" }}>
            No results found
          </Typography>
          <Box sx={{ mb: 3, maxWidth: 500, mx: "auto" }}>
            <Typography variant="body1" color="text.secondary" component="span">
              We couldn&apos;t find any matches for
            </Typography>{" "}
            <Typography
              variant="body1"
              color="text.secondary"
              component="span"
              sx={{ fontWeight: 500 }}
            >
              &quot;{searchQuery}&quot;
            </Typography>
            {". "}
            <Typography variant="body1" color="text.secondary" component="span">
              Try different keywords, check your spelling, or adjust your filters.
            </Typography>
          </Box>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
            <Button
              variant="outlined"
              color="primary"
              onClick={() => window.history.back()}
              startIcon={<ArrowBackIcon />}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                px: 4,
                minHeight: "unset",
                height: 48,
              }}
            >
              Go Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => (window.location.href = "/")}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                px: 4,
                minHeight: "unset",
                height: 48,
              }}
            >
              Explore Feed
            </Button>
          </Stack>
        </Paper>
      </Grid>
    </Zoom>
  );
});

NoResults.displayName = "NoResults";

export default NoResults;
