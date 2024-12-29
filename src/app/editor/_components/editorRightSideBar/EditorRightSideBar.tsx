import { Box, Grid2 as Grid, Typography } from "@mui/material";
import React from "react";
import PercentageCircle from "~/app/_components/percentageCircle/percentageCircle";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";

type editorRightSideBarProps = {
  accuracy: Array<{
    parameterName: string;
    value: number;
  }>;
};
const EditorRightSideBar: React.FC<editorRightSideBarProps> = ({
  accuracy,
}) => {
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
        {accuracy?.map(
          (item: { parameterName: string; value: number }, index: number) => {
            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "550",
                    fontSize: "14px",
                  }}
                >
                  {`${item.parameterName} `}
                </Typography>

                <PercentageCircle variant="determinate" value={item.value} />
              </Box>
            );
          },
        )}
      </Grid>
    </Grid>
  );
};

export default EditorRightSideBar;
