"use client";

import { memo, useCallback } from "react";
import ArticleIcon from "@mui/icons-material/Article";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import {
  alpha,
  Box,
  Button,
  ButtonGroup,
  Paper,
  Typography,
  useTheme,
  type Theme,
} from "@mui/material";
import {
  FILTER_OPTIONS,
  SORT_OPTIONS,
  type FilterTypeOption,
  type SortByOption,
} from "../_config/config";

type SearchControlsProps = {
  isMobile: boolean;
  sortBy: SortByOption;
  filterType: FilterTypeOption;
  onSortChange: (value: string) => void;
  onFilterChange: (value: string) => void;
};

const FilterButton = memo(
  ({
    icon,
    label,
    value,
    currentValue,
    onClick,
    isMobile,
    theme,
  }: {
    icon: React.ReactNode;
    label: string;
    value: string;
    currentValue: string;
    onClick: (value: string) => void;
    isMobile: boolean;
    theme: Theme;
  }) => {
    const handleClick = useCallback(() => {
      onClick(value);
    }, [onClick, value]);

    const isActive = currentValue === value;

    return (
      <Button
        startIcon={icon}
        onClick={handleClick}
        sx={{
          px: { xs: 1, sm: 2 },
          backgroundColor: isActive ? alpha(theme.palette.primary.main, 0.1) : "transparent",
          color: isActive ? theme.palette.primary.main : "text.secondary",
          borderColor: isActive ? theme.palette.primary.main : alpha(theme.palette.divider, 0.2),
          fontWeight: isActive ? 600 : 400,
          flex: isMobile ? 1 : "auto",
          "&:hover": {
            backgroundColor: isActive
              ? alpha(theme.palette.primary.main, 0.15)
              : alpha(theme.palette.divider, 0.05),
          },
        }}
      >
        {label}
      </Button>
    );
  },
);

FilterButton.displayName = "FilterButton";

const SortButton = memo(
  ({
    label,
    value,
    currentValue,
    onClick,
    isMobile,
    theme,
  }: {
    label: string;
    value: string;
    currentValue: string;
    onClick: (value: string) => void;
    isMobile: boolean;
    theme: Theme;
  }) => {
    const handleClick = useCallback(() => {
      onClick(value);
    }, [onClick, value]);

    const isActive = currentValue === value;

    return (
      <Button
        onClick={handleClick}
        sx={{
          minWidth: 0,
          px: { xs: 1, sm: 1.5 },
          py: 0.5,
          backgroundColor: isActive ? alpha(theme.palette.primary.main, 0.1) : "transparent",
          color: isActive ? theme.palette.primary.main : "text.secondary",
          fontWeight: isActive ? 600 : 400,
          fontSize: "0.75rem",
          textTransform: "none",
          flex: isMobile ? 1 : "auto",
          "&:hover": {
            backgroundColor: isActive
              ? alpha(theme.palette.primary.main, 0.15)
              : alpha(theme.palette.divider, 0.1),
          },
        }}
      >
        {label}
      </Button>
    );
  },
);

SortButton.displayName = "SortButton";

const SearchControls = memo(
  ({ isMobile, sortBy, filterType, onSortChange, onFilterChange }: SearchControlsProps) => {
    const theme = useTheme();

    // Get filter icon based on filter type
    const getFilterIcon = (type: FilterTypeOption) => {
      switch (type) {
        case "all":
          return <SearchIcon fontSize="small" />;
        case "people":
          return <PersonIcon fontSize="small" />;
        case "posts":
          return <ArticleIcon fontSize="small" />;
        default:
          return <SearchIcon fontSize="small" />;
      }
    };

    return (
      <Box sx={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 1, sm: 1.5, md: 2 },
            borderRadius: { xs: 1, sm: 2 },
            backgroundColor: alpha(theme.palette.background.paper, 0.95),
            backdropFilter: "blur(10px)",
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            boxShadow: `0 2px 12px ${alpha(theme.palette.divider, 0.1)}`,
            mb: { xs: 2, sm: 3 },
            width: "100%",
            maxWidth: "100%",
            boxSizing: "border-box",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              width: "100%",
              maxWidth: "100%",
            }}
          >
            {/* Filter Type Controls */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: isMobile ? "100%" : "auto",
                maxWidth: "100%",
              }}
            >
              <ButtonGroup
                variant="outlined"
                size="small"
                sx={{
                  "& .MuiButtonGroup-grouped": {
                    borderColor: alpha(theme.palette.divider, 0.2),
                    "&:not(:last-of-type)": {
                      borderColor: alpha(theme.palette.divider, 0.2),
                    },
                  },
                  width: isMobile ? "100%" : "auto",
                  maxWidth: "100%",
                  flexWrap: isMobile ? "wrap" : "nowrap",
                }}
              >
                {Object.entries(FILTER_OPTIONS).map(([value, label]) => (
                  <FilterButton
                    key={value}
                    icon={getFilterIcon(value as FilterTypeOption)}
                    label={label}
                    value={value}
                    currentValue={filterType}
                    onClick={onFilterChange}
                    isMobile={isMobile}
                    theme={theme}
                  />
                ))}
              </ButtonGroup>
            </Box>

            {/* Sort Controls */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: isMobile ? "100%" : "auto",
                maxWidth: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  backgroundColor: alpha(theme.palette.background.default, 0.5),
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  width: isMobile ? "100%" : "auto",
                  maxWidth: "100%",
                  flexWrap: isMobile ? "wrap" : "nowrap",
                }}
              >
                <TuneIcon sx={{ color: "text.secondary", fontSize: 18 }} />
                <Typography variant="body2" color="text.secondary" sx={{ mr: 1, fontWeight: 500 }}>
                  Sort:
                </Typography>
                <ButtonGroup
                  variant="text"
                  size="small"
                  sx={{
                    "& .MuiButtonGroup-grouped": {
                      border: "none",
                      minWidth: "auto",
                    },
                    flex: isMobile ? 1 : "auto",
                    maxWidth: "100%",
                  }}
                >
                  {Object.entries(SORT_OPTIONS).map(([value, label]) => (
                    <SortButton
                      key={value}
                      label={label}
                      value={value}
                      currentValue={sortBy}
                      onClick={onSortChange}
                      isMobile={isMobile}
                      theme={theme}
                    />
                  ))}
                </ButtonGroup>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    );
  },
);

SearchControls.displayName = "SearchControls";

export default SearchControls;
