"use client";

import React from "react";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhoto";
import { Box, Button, Divider, Grid2 as Grid, Typography } from "@mui/material";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";
import { type Iteration } from "../../types/types";

type EditorLeftSideBarPropsForIterations = {
  iterations: Iteration[];
  selectedIterationId: string;
  handleIterationSelected: (iterationId: string) => void;
  handleAddIteration: (content?: string) => void;
  handleSaveLastIterationData: () => void;
  showIterations?: boolean;
  handleImportText: () => void;
};

const EditorLeftSideBarForIterations: React.FC<EditorLeftSideBarPropsForIterations> = ({
  iterations,
  handleIterationSelected,
  handleAddIteration,
  selectedIterationId,
  handleSaveLastIterationData,
  showIterations,
  handleImportText,
}) => {
  const router = useRouter();

  return (
    <Grid
      columns={1}
      sx={{
        width: "100%",
        height: "90vh",
        spacing: 3,
        backgroundColor: "white",
        position: "relative",
        py: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          py: "4px",
          px: 2,
          cursor: "pointer",
        }}
        onClick={() => {
          if (showIterations) {
            handleSaveLastIterationData();
          }
          router.push("/");
        }}
      >
        <ArrowBackIosIcon
          sx={{
            fontSize: "20px",
          }}
        />
        <Typography
          variant="body1"
          sx={{
            fontSize: "16px",
            color: "common.gray",
          }}
        >
          {STATIC_TEXTS.EDITOR_PAGE.HEADING}
        </Typography>
      </Box>

      <Divider
        sx={{
          width: "100%",
        }}
      />

      {showIterations && (
        <Grid
          container
          sx={{
            marginTop: 2,
            px: 3,
            gap: "20px",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Iterations
          </Typography>
          <Button
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              gap: "8px",
              width: "100%",
              backgroundColor: "primary.main",
              minHeight: "auto",
              color: "white",
              py: "10px",
            }}
            onClick={() => handleAddIteration()}
          >
            <AddIcon />
            <Typography
              sx={{
                fontSize: "15px",
              }}
            >
              {STATIC_TEXTS.EDITOR_PAGE.ADD_ITERATION}
            </Typography>
          </Button>
          <Button
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              gap: "8px",
              width: "100%",
              backgroundColor: "secondary.main",
              minHeight: "auto",
              py: "10px",
            }}
            onClick={handleImportText}
          >
            <InsertPhotoOutlinedIcon />
            <Typography
              sx={{
                fontSize: "15px",
                color: "primary.main",
              }}
            >
              {STATIC_TEXTS.EDITOR_PAGE.IMPORT_TEXT}
            </Typography>
          </Button>
          <Box
            sx={{
              color: "black",
              width: "100%",
            }}
          >
            {iterations.map((item, index) => {
              return (
                <Box
                  sx={{
                    borderRadius: "4px",
                    border: "1px solid ",
                    borderColor: "common.strokePrimary",
                    padding: "8px 10px",
                    marginTop: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  key={item.id}
                  onClick={() => handleIterationSelected(item.id)}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: item.id == selectedIterationId ? "#260EB9" : "font.secondary",
                    }}
                  >
                    {item?.iterationName != "" ? item?.iterationName : `Iteration ${index + 1}`}
                  </Typography>
                  <ArrowForwardIosOutlinedIcon
                    sx={{
                      color: item.id == selectedIterationId ? "#260EB9" : "common.gray",
                      fontSize: "12px",
                    }}
                  />
                </Box>
              );
            })}
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default EditorLeftSideBarForIterations;
