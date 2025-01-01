"use client";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddIcon from "@mui/icons-material/Add";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhoto";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { Box, Button, Divider, Grid2 as Grid, Typography } from "@mui/material";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";
import React from "react";
import { type Iteration } from "../../types/types";
import { useRouter } from "next/navigation";

type editorLeftSideBarProps = {
  iterations: Iteration[];
};

const EditorLeftSideBar: React.FC<editorLeftSideBarProps> = ({
  iterations,
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
          router.back();
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
          <Box
            sx={{
              borderRadius: "4px",
              border: "1px solid ",
              borderColor: "common.strokePrimary",
              padding: "8px 10px",
              marginTop: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                color: "font.secondary",
              }}
            >
              {" "}
              {iterations[0]?.iterationName !== ""
                ? iterations[0]?.iterationName
                : `Iteration 0`}
            </Typography>
            <ArrowForwardIosOutlinedIcon
              sx={{
                color: "common.gray",
                fontSize: "12px",
              }}
            />
          </Box>
          {iterations?.map((item, index) => {
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
                }}
                key={index + 1}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "font.secondary",
                  }}
                >
                  {iterations[index]?.iterationName != ""
                    ? iterations[index]?.iterationName
                    : `Iteration ${index + 1}`}
                </Typography>
                <ArrowForwardIosOutlinedIcon
                  sx={{
                    color: "common.gray",
                    fontSize: "12px",
                  }}
                />
              </Box>
            );
          })}
        </Box>
      </Grid>
    </Grid>
  );
};

export default EditorLeftSideBar;
