import SearchIcon from "@mui/icons-material/Search";
import { Box, Chip, Divider, Typography } from "@mui/material";
import BackButton from "./BackButton";

type SearchHeaderProps = {
  searchQuery: string;
};

export default function SearchHeader({ searchQuery }: SearchHeaderProps) {
  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        backgroundColor: "rgba(245, 247, 254, 0.95)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
        p: { xs: 1, sm: 1.5, md: 2 },
        mb: { xs: 2, sm: 3 },
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: { xs: "wrap", sm: "nowrap" },
        }}
      >
        <BackButton />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: { xs: "calc(100% - 56px)", sm: "auto" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexWrap: { xs: "wrap", sm: "nowrap" },
            }}
          >
            <SearchIcon
              fontSize="small"
              sx={{
                color: "primary.main",
                opacity: 0.8,
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "text.primary",
                letterSpacing: "-0.01em",
              }}
            >
              Search
            </Typography>

            {searchQuery && (
              <>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ mx: 1, height: 16, alignSelf: "center" }}
                />
                <Chip
                  size="small"
                  label={searchQuery}
                  color="primary"
                  variant="outlined"
                  sx={{
                    fontWeight: 500,
                    height: 24,
                    "& .MuiChip-label": {
                      px: 1,
                    },
                  }}
                />
              </>
            )}
          </Box>

          {!searchQuery && (
            <Typography
              variant="body2"
              color="text.secondary"
              component="span"
              sx={{
                mt: 0.5,
                fontSize: "0.8rem",
                opacity: 0.8,
              }}
            >
              Enter a search term to find results
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
