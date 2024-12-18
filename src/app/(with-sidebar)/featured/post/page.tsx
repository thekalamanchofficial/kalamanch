"use client";
import {
  Box,
  CardMedia,
  Divider,
  Grid2 as Grid,
  Typography,
} from "@mui/material";
import SeeMoreButton from "~/app/_components/seeMoreButton/SeeMoreButton";
import Loader from "~/app/_components/loader/Loader";
import useFeaturedPostPage from "./_hooks/useFeaturedPostPage";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";

const Page = () => {
  const { post, isLoading, handleClick } = useFeaturedPostPage();
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        padding: "2px",
      }}
    >
      <Grid
        size={12}
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "start",
          px: "4px",
          pt: "8px",
          borderBottom: "1px solid #E0E0E0",
        }}
      >
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              // color: "font.primary",
              padding: "4px",
              fontWeight: "550",
              fontSize: "24px",
              color: "primary.main",
            }}
          >
            Featured Articles
          </Typography>
        </Box>
      </Grid>
      <Grid
        size={12}
        container
        spacing={4}
        sx={{
          padding: "10px",
          height: "100%",
        }}
      >
        {post.length > 0 ? (
          post.map((item, index) => {
            return (
              <Grid
                size={{
                  md: 6,
                  sm: 12,
                }}
                key={index}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "start",
                    width: "100%",
                    padding: "4px",
                    height: "auto",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="80"
                    image={"https://picsum.photos/200"}
                    alt="green iguana"
                    sx={{
                      width: "400px",
                      height: "250px",
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "start",
                      width: "100%",
                      gap: "10px",
                      ":hover": {
                        cursor: "pointer",
                      },
                    }}
                    onClick={() => handleClick(item.postId)}
                  >
                    <Typography
                      sx={{
                        fontSize: "24px",
                        color: "primary.main",
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                        ml: "4px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "16px",
                        }}
                      >
                        December 12, 2024
                      </Typography>
                      <Divider orientation="vertical" flexItem />
                      <SeeMoreButton />
                    </Box>
                  </Box>
                </Box>
              </Grid>
            );
          })
        ) : (
          <Typography
            variant="caption"
            sx={{
              textAlign: "center",
              padding: "10px",
              margin: "10px",
            }}
          >
            {STATIC_TEXTS.FEATURED_PAGE.MESSAGES.NO_POST}
          </Typography>
        )}
        {isLoading ? (
          <Loader title="Loading Posts..." height="auto" width="100%" />
        ) : null}
      </Grid>
    </Box>
  );
};

export default Page;
