"use client";
import {
  Button,
  Typography,
  Grid2 as Grid,
  Box,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Link from "next/link";
import UserNameProfile from "./UserNameProfile";

import { type RightSideBarProps } from "~/app/(with-sidebar)/myfeed/types/types";
import FollowButton from "~/app/_components/myfeed/FollowButton";

const RightSideBar: React.FC<RightSideBarProps> = ({
  featuredArticles,
  authorToFollow,
}) => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "5px",
          width: "100%",
          height: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
          px: "12px",
          py: "8px",
        }}
      >
        <Typography
          sx={{
            color: "text.primary",
            fontSize: "18px",
            fontWeight: "550",
            mt: "2px",
          }}
        >
          Featured Writings
        </Typography>
        <Grid container spacing={1}>
          {featuredArticles.map((item, index) => {
            return (
              <Grid size={12} key={index}>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "start",
                    pt: "3px",
                  }}
                >
                  <Link
                    href={item.articleLink}
                    style={{ textDecoration: "none" }}
                  >
                    <Typography
                      sx={{ color: "font.primary", fontWeight: "500" }}
                    >
                      {item.articleName}
                    </Typography>
                  </Link>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      py: "8px",
                    }}
                  >
                    <Link
                      href={item.authorProfileLink}
                      style={{ textDecoration: "none" }}
                    >
                      <UserNameProfile
                        ImageHeight={25}
                        ImageWidth={25}
                        NameFontSize={15}
                        NameFontWeight="400"
                        AuthorName={item.authorName}
                        AuthorImage={item.profilePicture}
                      />
                    </Link>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <IconButton
                        sx={{
                          color: "text.secondary",
                          width: "10px",
                          height: "10px",
                        }}
                        size="small"
                      >
                        <FavoriteBorderIcon />
                      </IconButton>
                      <Typography
                        sx={{
                          marginLeft: "10px",
                          fontSize: "15px",
                          color: "text.secondary",
                        }}
                      >
                        {item.likes}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
        <Button
          sx={{
            minHeight: "auto",
            height: "30px",
            width: "auto",
            color: "primary.main",
            fontWeight: "bold",
            fontSize: "15px",
            mt: "10px",
          }}
        >
          See more
        </Button>
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "5px",
          width: "100%",
          height: "48%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
          px: "12px",
          py: "8px",
        }}
      >
        <Typography
          sx={{
            color: "text.primary",
            fontSize: "18px",
            fontWeight: "550",
            // py: "5px",
            mt: "2px",
            marginBottom: "10px",
          }}
        >
          Top writers to follow
        </Typography>
        <Grid container spacing={2}>
          {authorToFollow.map((item, index) => {
            return (
              <Grid size={12} key={index}>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "start",
                    alignItems: "start",
                    pt: "3px",
                  }}
                >
                  <Link
                    style={{
                      textDecoration: "none",
                    }}
                    href={item.authorProfileLink}
                  >
                    <Image
                      alt="profile picture "
                      src={item.profilePicture}
                      width={40}
                      height={40}
                      style={{
                        borderRadius: "100%",
                      }}
                    ></Image>
                  </Link>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "start",
                      alignItems: "start",
                      width: "100%",
                    }}
                  >
                    <Link
                      style={{
                        textDecoration: "none",
                      }}
                      href={item.authorProfileLink}
                    >
                      <Typography
                        sx={{
                          fontSize: "15px",
                          color: "text.primary",
                          marginLeft: "8px",
                        }}
                      >
                        {item.authorName}
                      </Typography>
                    </Link>
                    <FollowButton authorProfileLink={item.authorProfileLink} />
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
        <Button
          sx={{
            minHeight: "auto",
            height: "30px",
            width: "auto",
            color: "primary.main",
            fontWeight: "bold",
            fontSize: "15px",
            mt: "10px",
          }}
        >
          See more
        </Button>
      </Box>
    </>
  );
};

export default RightSideBar;
