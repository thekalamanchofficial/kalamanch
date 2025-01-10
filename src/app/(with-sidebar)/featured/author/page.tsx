"use client";
import { Box, Grid2 as Grid, Typography } from "@mui/material";
import Loader from "~/app/_components/loader/Loader";
import UserNameProfile from "~/app/_components/userNameProfile/UserNameProfile";
import Link from "next/link";
import FollowButton from "~/app/_components/followButton/FollowButton";
import useFeaturedAuthorPage from "./_hooks/useFeaturedAuthorPage";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";

const Page = () => {
  const { usersToFollow: author, isLoading, userFollowing } = useFeaturedAuthorPage();

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
          marginBottom: "10px",
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
        {author.length > 0 ? (
          author.map((item, index) => {
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
                          AuthorImage={item.profileImageUrl}
                          AuthorName={item.name}
                        />
                      </Link>
                      <Typography variant="caption">
                        Followers: {item.followersCount}
                      </Typography>
                      <Typography variant="caption">
                        Articles: {item.postCount}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <FollowButton
                      authorProfileLink={item.profileImageUrl}
                      style={{
                        height: "40px",
                        width: "100px",
                      }}
                      isFollowing={isFollowing}
                    />
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
            {STATIC_TEXTS.FEATURED_PAGE.MESSAGES.NO_AUTHOR}
          </Typography>
        )}
        {isLoading ? (
          <Loader title="Loading authors..." height="auto" width="100%" />
        ) : null}
      </Grid>
    </Box>
  );
};

export default Page;
