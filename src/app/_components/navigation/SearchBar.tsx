"use client";

import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import {
  alpha,
  Box,
  ClickAwayListener,
  IconButton,
  InputAdornment,
  TextField,
  useTheme,
} from "@mui/material";
import SearchResultsPopup from "~/app/_components/search/SearchResultsPopup";

export type SearchBarProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showSearchResults: boolean;
  setShowSearchResults: (show: boolean) => void;
};

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  showSearchResults,
  setShowSearchResults,
}: SearchBarProps) => {
  const theme = useTheme();
  const searchResultsRef = React.useRef<HTMLDivElement | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSearchResults(value.trim().length > 0);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setShowSearchResults(false);
  };

  const handleFocus = () => {
    if (searchQuery.trim().length > 0) {
      setShowSearchResults(true);
    }
  };

  const handleClickAway = (event: MouseEvent | TouchEvent) => {
    if (
      searchResultsRef.current &&
      event.target instanceof Node &&
      searchResultsRef.current.contains(event.target)
    ) {
      return;
    }
    setShowSearchResults(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway} touchEvent={false}>
      <Box sx={{ position: "relative", width: "100%" }}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
            zIndex: 1000,
          }}
        >
          <TextField
            placeholder="Search posts, people, topics..."
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={handleFocus}
            fullWidth
            size="medium"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="primary" sx={{ fontSize: "1.3rem", ml: 0.5 }} />
                  </InputAdornment>
                ),
                endAdornment: searchQuery ? (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="clear search"
                      onClick={handleClearSearch}
                      edge="end"
                      size="small"
                      sx={{ mr: 0.5 }}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.8rem",
                          fontWeight: "bold",
                          color: theme.palette.text.secondary,
                        }}
                      >
                        <CloseIcon fontSize="small" />
                      </Box>
                    </IconButton>
                  </InputAdornment>
                ) : null,
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                height: 44,
                borderRadius: "24px",
                backgroundColor: alpha(theme.palette.common.black, 0.04),
                transition: "all 0.2s ease",
                pl: 1,
                pr: searchQuery ? 0.5 : 2,
                "&:hover": {
                  backgroundColor: alpha(theme.palette.common.black, 0.06),
                  boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
                },
                "&.Mui-focused": {
                  backgroundColor: "white",
                  boxShadow: "0 3px 12px rgba(0,0,0,0.12)",
                  borderColor: theme.palette.primary.main,
                  borderWidth: 1,
                },
              },
              "& .MuiInputBase-input": {
                fontSize: "1rem",
                "&::placeholder": {
                  opacity: 0.4,
                  fontStyle: "italic",
                },
              },
              "& .MuiButtonBase-root": {
                minHeight: 23,
              },
            }}
          />
          {showSearchResults && (
            <Box
              ref={searchResultsRef}
              sx={{
                width: "100%",
                zIndex: theme.zIndex.modal,
                mt: 1,
                borderRadius: 2,
                overflow: "visible",
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                backgroundColor: "background.paper",
              }}
            >
              <SearchResultsPopup
                searchQuery={searchQuery}
                onClose={() => setShowSearchResults(false)}
              />
            </Box>
          )}
        </Box>
      </Box>
    </ClickAwayListener>
  );
};

export default SearchBar;
