"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box, Chip, Grid2 as Grid, Typography } from "@mui/material";
import FollowButton from "~/app/_components/followButton/FollowButton";
import { trpc } from "~/server/client";
import SeeMoreButton from "../seeMoreButton/SeeMoreButton";
import { STATIC_TEXTS } from "../static/staticText";
import UserNameProfile from "../userNameProfile/UserNameProfile";
import RightSideBarSkeletonAuthor from "./RightSideBarSkeletonAuthor";
import RightSideBarSkeletonPost from "./RightSideBarSkeletonPost";

const RightSideBar = () => {
  const { user } = useClerk();
  const router = useRouter();
  const featuredPostMutation = trpc.featuredPost;
  const userMutation = trpc.user;
  const featuredAuthorMutation = trpc.usersToFollow;

  const { data: usersAlreadyFollowing } = userMutation.getUserFollowings.useQuery({
    userEmail: user?.primaryEmailAddress?.emailAddress ?? "",
  });
  const { data: usersToFollowData, isLoading: usersToFollowLoading } =
    featuredAuthorMutation.getUsersToFollow.useQuery({
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
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          overflow: "hidden",
        }}
      >
        <Box sx={{ p: 2, pb: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: "18px",
              fontWeight: "550",
              color: "text.primary",
            }}
          >
            Featured Writings
          </Typography>
        </Box>
        <Box sx={{ px: 2, pb: 2 }}>
          <Grid container spacing={2}>
            {featuredPostLoading ? (
              <RightSideBarSkeletonPost />
            ) : (featuredPostData?.featuredPosts?.length ?? 0) > 0 ? (
              featuredPostData?.featuredPosts.map((item, index) => (
                <Grid size={12} key={index}>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                    }}
                  >
                    <Link
                      href={`/posts/${item.id}`}
                      style={{ textDecoration: "none", width: "100%" }}
                    >
                      <Typography
                        sx={{
                          color: "primary.main",
                          fontWeight: "550",
                          fontSize: "14px",
                          lineHeight: 1.4,
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
                      }}
                    >
                      <Link href={`/profile/${item.authorId}`} style={{ textDecoration: "none" }}>
                        <UserNameProfile
                          ImageHeight={24}
                          ImageWidth={24}
                          NameFontSize={13}
                          NameFontWeight="400"
                          AuthorName={item.authorName}
                          AuthorImage={item.authorProfileImageUrl}
                        />
                      </Link>
                      <Chip
                        label={item.likeCount}
                        icon={<FavoriteBorderIcon sx={{ fontSize: "16px" }} />}
                        sx={{
                          height: "24px",
                          "& .MuiChip-label": {
                            px: 1,
                            fontSize: "12px",
                          },
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>
              ))
            ) : (
              <Grid size={12}>
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    textAlign: "center",
                    py: 2,
                  }}
                >
                  {STATIC_TEXTS.FEATURED_PAGE.MESSAGES.NO_POST}
                </Typography>
              </Grid>
            )}
          </Grid>
          {featuredPostData?.hasMore && (
            <Box sx={{ mt: 2 }}>
              <SeeMoreButton onClick={() => handleSeeMore("/featured")} />
            </Box>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          overflow: "hidden",
        }}
      >
        <Box sx={{ p: 2, pb: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: "18px",
              fontWeight: "550",
              color: "text.primary",
            }}
          >
            Top writers to follow
          </Typography>
        </Box>
        <Box sx={{ px: 2, pb: 2 }}>
          <Grid container spacing={2}>
            {usersToFollowLoading ? (
              <RightSideBarSkeletonAuthor />
            ) : (usersToFollowData?.featuredAuthor?.length ?? 0) > 0 ? (
              usersToFollowData?.featuredAuthor.map((item, index) => {
                const isFollowing = usersAlreadyFollowing?.includes(item.userId);
                return (
                  <Grid size={12} key={index}>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 1.5,
                      }}
                    >
                      <Link
                        href={`/profile/${item.userId}`}
                        style={{
                          textDecoration: "none",
                          flexShrink: 0,
                        }}
                      >
                        <Image
                          alt={`${item.name}'s profile picture`}
                          src={item.profileImageUrl}
                          width={36}
                          height={36}
                          style={{
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                        />
                      </Link>
                      <Box
                        sx={{
                          flex: 1,
                          minWidth: 0,
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.5,
                        }}
                      >
                        <Link href={`/profile/${item.userId}`} style={{ textDecoration: "none" }}>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: "500",
                              color: "text.primary",
                              "&:hover": {
                                color: "primary.main",
                              },
                            }}
                          >
                            {item.name}
                          </Typography>
                        </Link>
                        <FollowButton
                          authorProfileLink={item.userId}
                          style={{
                            height: "28px",
                            minWidth: "80px",
                            padding: "4px 12px",
                            fontSize: "13px",
                          }}
                          isFollowing={isFollowing}
                        />
                      </Box>
                    </Box>
                  </Grid>
                );
              })
            ) : (
              <Grid size={12}>
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    textAlign: "center",
                    py: 2,
                  }}
                >
                  {STATIC_TEXTS.FEATURED_PAGE.MESSAGES.NO_AUTHOR}
                </Typography>
              </Grid>
            )}
          </Grid>
          {usersToFollowData?.hasMoreAuthor && (
            <Box sx={{ mt: 2 }}>
              <SeeMoreButton onClick={() => handleSeeMore("/featured/author")} />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default RightSideBar;
