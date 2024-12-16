"use client";
import { Typography, Grid2 as Grid, Box, Chip } from "@mui/material";
import Image from "next/image";
import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Link from "next/link";
import UserNameProfile from "../userNameProfile/UserNameProfile";

import FollowButton from "~/app/_components/followButton/FollowButton";
import SeeMoreButton from "../seeMoreButton/SeeMoreButton";
import { trpc } from "~/server/client";
import Loader from "../loader/Loader";
import { useRouter } from "next/navigation";

const RightSideBar = () => {
  const router = useRouter();

  const featuredAuthorMutation = trpc.featuredAuthor;
  const featuredPostMutation = trpc.featuredPost;

  const { data: featuredAuthorData, isLoading: featuredAuthorLoading } =
    featuredAuthorMutation.getFeaturedAuthors.useQuery({
      limit: 5,
      skip: 0,
    });

  const { data: featuredPostData, isLoading: featuredPostLoading } =
    featuredPostMutation.getFeaturedPosts.useQuery({
      limit: 5,
      skip: 0,
    });

  const handleSeeMore = (route: string) => {
    router.push(route);
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "5px",
          width: "100%",
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
          {featuredPostLoading ? (
            <Loader
              height="100%"
              width="100%"
              title="Please wait, loading..."
            />
          ) : (
            featuredPostData?.featuredPosts.map((item, index) => {
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
                      href={`/article/${item.postId}`}
                      style={{ textDecoration: "none", color: "text.primary" }}
                    >
                      <Typography
                        sx={{
                          color: "font.primary",
                          fontWeight: "550",
                          ":visited": {
                            color: "font.primary",
                          },
                        }}
                      >
                        {item.title}
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
                        href={`/profile/${item.authorId}`}
                        style={{ textDecoration: "none" }}
                      >
                        <UserNameProfile
                          ImageHeight={25}
                          ImageWidth={25}
                          NameFontSize={15}
                          NameFontWeight="400"
                          AuthorName={item.authorName}
                          AuthorImage={item.authorProfile}
                        />
                      </Link>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Chip
                          label={item.likeCount}
                          icon={<FavoriteBorderIcon />}
                          sx={{
                            backgroundColor: "white",
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              );
            })
          )}
          {featuredPostData?.hasMorePost ? (
            <SeeMoreButton onClick={() => handleSeeMore("/featured/post")} />
          ) : null}
        </Grid>
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "5px",
          width: "100%",
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
            marginBottom: "10px",
          }}
        >
          Top writers to follow
        </Typography>
        <Grid container spacing={2}>
          {featuredAuthorLoading ? (
            <Loader
              height="100%"
              width="100%"
              title="Please wait, loading..."
            />
          ) : (
            featuredAuthorData?.featuredAuthor.map((item, index) => {
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
                      href={`/profile/${item.userId}`}
                    >
                      <Image
                        alt="profile picture "
                        src={item.profile}
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
                        href={`/profile/${item.userId}`}
                      >
                        <Typography
                          sx={{
                            fontSize: "15px",
                            color: "text.primary",
                            marginLeft: "8px",
                          }}
                        >
                          {item.name}
                        </Typography>
                      </Link>
                      <FollowButton
                        authorProfileLink={`/profile/${item.userId}`}
                      />
                    </Box>
                  </Box>
                </Grid>
              );
            })
          )}
          {featuredAuthorData?.hasMoreAuthor ? (
            <SeeMoreButton onClick={() => handleSeeMore("/featured/author")} />
          ) : null}
        </Grid>
      </Box>
    </>
  );
};

export default RightSideBar;
