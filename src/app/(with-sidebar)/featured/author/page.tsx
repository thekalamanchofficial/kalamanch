"use client";
import { Box, Grid2 as Grid, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { trpc } from "~/server/client";
import { type FeaturedAuthor } from "../../myfeed/types/types";
import config from "~/app/_config/config";
import Loader from "~/app/_components/loader/Loader";
import UserNameProfile from "~/app/_components/userNameProfile/UserNameProfile";
import Link from "next/link";
import FollowButton from "~/app/_components/followButton/FollowButton";
import { useClerk } from "@clerk/nextjs";

const Page = () => {
  const { user } = useClerk();
  const [author, setAuthor] = useState<FeaturedAuthor[]>([]);
  const [skip, setSkip] = useState(0);
  const [hasMoreAuthor, setHasMoreAuthor] = useState<boolean | undefined>(true);

  const featuredAuthorMutation = trpc.featuredAuthor;
  const userMutation = trpc.user;

  const { data: userFollowing } = userMutation.getUserFollowings.useQuery({
    userEmail: user?.primaryEmailAddress?.emailAddress ?? "",
  });

  const { data, isLoading, error } =
    featuredAuthorMutation.getFeaturedAuthors.useQuery(
      {
        skip,
        limit:
          skip === 0
            ? config.lazyLoading.initialLimit
            : config.lazyLoading.limit,
      },
      {
        enabled: skip >= 0 && hasMoreAuthor === true,
      },
    );

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const bottomReached = scrollHeight - scrollTop - clientHeight < 10;

    if (bottomReached && !isLoading && !error) {
      setHasMoreAuthor(data?.hasMoreAuthor);
      setSkip((prev) =>
        prev == 0
          ? config.lazyLoading.initialLimit + prev
          : prev + config.lazyLoading.limit,
      );
    }
  }, [error, data?.hasMoreAuthor, isLoading]);

  useEffect(() => {
    setAuthor((prevAuthor) => [...prevAuthor, ...(data?.featuredAuthor ?? [])]);
  }, [data]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, hasMoreAuthor, isLoading]);

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
              padding: "4px",
              fontWeight: "550",
              fontSize: "24px",
              color: "primary.main",
            }}
          >
            Authors to follow
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
        {author.map((item, index) => {
          const isFollowing = userFollowing?.includes(item.userId);

          return (
            <Grid
              size={12}
              sx={{
                width: "100%",
              }}
              key={index}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                    gap={10}
                  >
                    <Link
                      href={`/author/${item.userId}`}
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      <UserNameProfile
                        AuthorImage={item.profile}
                        AuthorName={item.name}
                      />
                    </Link>
                    <Typography variant="caption">
                      Followers: {item.followersCount}
                    </Typography>
                    <Typography variant="caption">
                      Articles: {item.articlesCount}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <FollowButton
                    authorProfileLink={item.userId}
                    style={{
                      height: "40px",
                      width: "100px",
                    }}
                    followState={isFollowing ? "Following" : "Follow"}
                  />
                </Box>
              </Box>
            </Grid>
          );
        })}
        {isLoading ? (
          <Loader title="Loading authors..." height="auto" width="100%" />
        ) : null}
      </Grid>
    </Box>
  );
};

export default Page;
