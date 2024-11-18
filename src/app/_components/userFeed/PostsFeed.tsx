import {
  Grid2 as Grid,
  Button,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import userImage from "~/assets/images/user.jpeg";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";

const PostsFeed = () => {
  return (
    <>
      <Grid
        size={12}
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "start",
          px: "4px",
          pt: "4px",
          borderBottom: "1px solid #E0E0E0",
        }}
      >
        <Button
          sx={{
            fontSize: "16px ",
            color: "primary.main",
            marginRight: "10px",
            minHeight: "auto",
            borderBottom: "2px solid ",
            borderColor: "primary.main",
            borderRadius: "0px",
          }}
        >
          My feed
        </Button>
        <Button
          sx={{
            fontSize: "16px ",
            minHeight: "auto",
            color: "text.secondary",
            marginRight: "10px",
          }}
        >
          Discover
        </Button>
      </Grid>
      <Grid size={12}>
        <Card sx={{ width: "100%", boxShadow: "none" }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                mb: "16px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  alt="profile picture "
                  src={userImage}
                  width={50}
                  height={50}
                  style={{
                    borderRadius: "100%",
                  }}
                ></Image>
                <Typography
                  sx={{
                    fontSize: "17px",
                    fontWeight: "bold",
                    color: "text.primary",
                    marginLeft: "8px",
                  }}
                >
                  Steve Jobs
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  sx={{
                    backgroundColor: "secondary.main",
                    color: "primary.main",
                    minHeight: "auto",
                    height: "40px",
                    padding: "2px 10px ",
                    margin: "3px 5px ",
                    fontSize: "15px",
                  }}
                >
                  Follow
                </Button>
                <Button
                  startIcon={<MoreHorizOutlinedIcon />}
                  sx={{ color: "text.secondary", minHeight: "auto" }}
                  size="small"
                ></Button>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "start",
                pr: 10,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  py: "10px",
                }}
              >
                The Forgotten Violion
              </Typography>
              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: "15px",
                  marginBottom: "10px",
                }}
              >
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Aperiam itaque labore quisquam repellendus rem nisi
                exercitationem minus impedit non dolorem. Quasi, assumenda est?
                Pariatur reprehenderit nesciunt atque veritatis numquam ipsum
                tempore ratione eaque sint quos repellat, eos fuga cum obcaecati
                at beatae, ullam totam inventore praesentium quo cumque commodi
                odio. Reiciendis tenetur rerum officia. Fugit ea aliquid optio
                vero tenetur nostrum, eum ex illum officia, neque quis? Itaque
                eveniet, odio error natus quaerat deserunt porro et, quam quis
                magnam sapiente?
                <Button
                  variant="text"
                  sx={{
                    minHeight: "auto",
                    height: "30px",
                    width: "auto",
                    color: "primary.main",
                    fontSize: "15px",
                    ":hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                  disableTouchRipple
                >
                  See more
                </Button>
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                mb: "16px",
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image="https://fastly.picsum.photos/id/609/200/300.jpg?hmac=jkFe_vvVM_tvHdIFYhYtG6uWYznjI6zHzJpfOWfHGiU"
                alt="green iguana"
                sx={{
                  width: "50%",
                }}
              />
            </Box>

            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default PostsFeed;
