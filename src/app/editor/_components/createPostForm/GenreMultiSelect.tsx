import * as React from "react";
import { type Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import CancelIcon from "@mui/icons-material/Cancel";
import IconButton from "@mui/material/IconButton";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name: string, selectedGenres: string[], theme: Theme) {
  return {
    fontWeight: selectedGenres.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

type GenreMultiSelectProps = {
  value: string[] | undefined;
  onChange: (value: string[]) => void;
};

export default function GenreMultiSelect({
  value = [],
  onChange,
}: GenreMultiSelectProps) {
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    onChange(typeof value === "string" ? value.split(",") : value);
  };

  const handleDelete = (genreToDelete: string) => {
    onChange(value.filter((genre) => genre !== genreToDelete));
  };

  return (
    <Select
      labelId="demo-multiple-chip-label"
      id="demo-multiple-chip"
      multiple
      value={value}
      onChange={handleChange}
      sx={{
        display: "flex",
        alignItems: "center",
        minHeight: 48,
        overflow: "hidden",
      }}
      renderValue={(selected) => (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 0.5,
            alignItems: "center",
          }}
        >
          {selected.map((genre) => (
            <Chip
              key={genre}
              label={genre}
              onDelete={() => handleDelete(genre)}
              deleteIcon={
                <IconButton
                  size="small"
                  sx={{
                    ml: -0.5,
                    pointerEvents: "auto",
                    width: "1.8rem",
                    "&:hover": { backgroundColor: "transparent" },
                  }}
                  onMouseDown={(event) => event.stopPropagation()}
                >
                  <CancelIcon fontSize="small" />
                </IconButton>
              }
              sx={{
                overflow: "hidden",
                color: "primary.main",
              }}
            />
          ))}
        </Box>
      )}
      MenuProps={MenuProps}
    >
      {names.map((name) => (
        <MenuItem key={name} value={name} style={getStyles(name, value, theme)}>
          {name}
        </MenuItem>
      ))}
    </Select>
  );
}
