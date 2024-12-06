"use client";
import { Grid2 as Grid, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import PostsFeed from "~/app/_components/myfeed/PostsFeed";
import mockData from "./myfeedMock/myfeedMock";
const MyFeed = () => {
  const { user } = useClerk();
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  const [tab, setTab] = useState(0);
  const [skip, setSkip] = useState(0);
  const [posts, setPosts] = useState<ArticlesList[]>([]);
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  const {
    data: postData,
    isLoading: queryLoading,
    error,
  } = trpc.post.getPosts.useQuery(
    { skip, limit: 3 },
    {
      enabled: skip >= 0 && hasMorePosts,
    },
  );

  const { data: likedPostData } = trpc.likes.getUserLikes.useQuery(
    { userEmail: user?.primaryEmailAddress?.emailAddress ?? "" },
    {
      enabled: !!user?.primaryEmailAddress,
    },
  );

  const likePostMutation = trpc.likes.likePost.useMutation();

  const handleLikeButton = async (
    postId: string,
  ): Promise<{ liked: boolean }> => {
    if (user?.primaryEmailAddress?.emailAddress) {
      try {
        const response = await likePostMutation.mutateAsync({
          postId,
          userEmail: user?.primaryEmailAddress?.emailAddress,
        });

        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  likeCount: response.liked
                    ? post.likeCount + 1
                    : Math.max(0, post.likeCount - 1),
                }
              : post,
          ),
        );

        if (response.liked) {
          setLikedPosts((prevLikedPosts) => [...prevLikedPosts, postId]);
        } else {
          setLikedPosts((prevLikedPosts) =>
            prevLikedPosts.filter((id) => id !== postId),
          );
        }

        return { liked: response.liked };
      } catch (error) {
        handleError(error);
        return { liked: false };
      }
    }

    return { liked: false };
  };

  useEffect(() => {
    if (postData) {
      if (postData.length < 3) {
        setHasMorePosts(false);
      }
      if (skip === 0) {
        setIsLoadingInitial(false);
        setPosts(postData as ArticlesList[]);
      } else {
        if (postData.length === 0) {
          setHasMorePosts(false);
        } else {
          setPosts((prevPosts) => [
            ...prevPosts,
            ...(postData as ArticlesList[]),
          ]);
        }
      }
      setIsLoadingMore(false);
    }

    if (error) {
      setIsLoadingInitial(false);
      setIsLoadingMore(false);
    }
  }, [postData, error, skip]);

  useEffect(() => {
    if (likedPostData) {
      setLikedPosts(likedPostData);
    }
  }, [likedPostData]);

  const handleChange = (event: React.SyntheticEvent) => {
    setTab(1 - tab);
  };

  const handleScroll = (e: React.UIEvent) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const bottomReached = scrollHeight - scrollTop - clientHeight < 100;

    if (bottomReached && hasMorePosts && !isLoadingMore) {
      setSkip((prev) => prev + 3);
      setIsLoadingMore(true);
    }
  };

  return (
    <>
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
        <Tabs
          value={tab}
          onChange={handleChange}
          sx={{
            borderColor: "divider",
            "& .MuiTab-root": {
              fontSize: "16px",
              minHeight: "auto",
              height: "50px",
              marginRight: "10px",
              paddingBottom: "2px",
              textTransform: "none",
            },
            "& .MuiTab-textColorPrimary.Mui-selected": {
              color: "primary.main",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "primary.main",
              height: "2px",
            },
          }}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="My Feed" />
          <Tab label="Discover" />
        </Tabs>
      </Grid>
      {postData?.length != 0 ? (
        <Grid
          size={12}
          sx={{
            overflowY: "scroll",
            height: "100%",
            scrollbarWidth: "none",
            mt: 1,
            pl: 1,
          }}
          onScroll={handleScroll}
        >
          {isLoadingInitial ? (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <CircularProgress />
              Loading Posts...
            </Box>
          ) : tab === 0 ? (
            <>
              <PostsFeed
                articlesList={posts ?? []}
                likedPosts={likedPosts}
                handleLikeButton={handleLikeButton}
              />
              {isLoadingMore && (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  p={2}
                >
                  <CircularProgress size={24} />
                </Box>
              )}
            </>
          ) : (
            <div style={{ padding: "10px" }}>Discover Tab</div>
          )}
        </Grid>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Typography> No Posts Found</Typography>
        </Box>
      )}
    </>
  );
};

export default MyFeed;
