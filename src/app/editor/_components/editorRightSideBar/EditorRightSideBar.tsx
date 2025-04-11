import React from "react";
import { InfoOutlined } from "@mui/icons-material";
import { Box, Grid2 as Grid, Popover, Typography } from "@mui/material";
import PercentageCircle from "~/app/_components/percentageCircle/PercentageCircle";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";
import { type EvaluationResult } from "../evaluator/types/types";

type editorRightSideBarProps = {
  evaluationResult: EvaluationResult[];
  evaluationType: string | null;
};
const EditorRightSideBar: React.FC<editorRightSideBarProps> = ({ evaluationResult }) => {
  const [anchorEl, setAnchorEl] = React.useState<Record<number, SVGSVGElement | null>>({});

  const getColor = (value: number) => {
    if (value < 4) {
      return "#B71717";
    } else if (value < 7) {
      return "#E2AC22";
    } else {
      return "#17B752";
    }
  };
  return (
    <Grid
      columns={1}
      sx={{
        width: "100%",
        maxHeight: "810px",
        overflowY: "auto",
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
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontSize: "16px",
            color: "common.gray",
            fontWeight: "bold",
          }}
        >
          {STATIC_TEXTS.EDITOR_PAGE.RIGHTSIDEBAR_HEADING}
        </Typography>
      </Box>

      <Grid
        container
        sx={{
          marginTop: "18px",
          px: 2,
          gap: "20px",
          width: "100%",
        }}
      >
        {evaluationResult?.map((item, index) => {
          const color = getColor(item.score);

          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "left", gap: "5px" }}>
                <Box>
                  <InfoOutlined
                    sx={{ color: "primary.main", cursor: "pointer" }}
                    onClick={(event) =>
                      setAnchorEl((prev) => ({ ...prev, [index]: event.currentTarget }))
                    }
                  />
                  <Popover
                    open={Boolean(anchorEl[index])}
                    anchorEl={anchorEl[index]}
                    onClose={() => setAnchorEl((prev) => ({ ...prev, [index]: null }))}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                    slotProps={{
                      paper: {
                        sx: {
                          maxWidth: "300px",
                          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                        },
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "18px",
                        color: "text.secondary",
                        padding: "12px",
                      }}
                    >
                      {`${item.feedback} `}
                    </Typography>
                  </Popover>
                </Box>
                <Typography
                  sx={{
                    fontWeight: "550",
                    fontSize: "14px",
                  }}
                >
                  {`${item.parameter} `}
                </Typography>
              </Box>

              <PercentageCircle
                variant="determinate"
                value={(item.score * 100) / 10}
                fillColor={color}
              />
            </Box>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default EditorRightSideBar;
