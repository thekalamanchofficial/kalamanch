import {
  Box,
  Button,
  CardMedia,
  Chip,
  Typography,
  Grid2 as Grid,
  useMediaQuery,
  type Theme,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { type PostCardContentProps } from "~/app/(with-sidebar)/myfeed/types/types";
import { myfeedConfig } from "~/app/(with-sidebar)/myfeed/_config/config";
import SeeMoreButton from "../seeMoreButton/SeeMoreButton";
import "react-quill/dist/quill.snow.css";
import "./quillEditor.css";
import SeeLessButton from "../seeLessButton/SeeLessButton";
import dynamic from "next/dynamic";
import useSavedDateFormatter from "~/app/(with-sidebar)/myfeed/_hooks/useSavedDateFormatter";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const PostCardContent: React.FC<PostCardContentProps> = ({
  articleTitle,
  articleContent,
  articleTags,
  articleThumbnailUrl = "",
  articleDescription,
  savedDate,
}) => {
  const [seeMore, setSeeMore] = useState(false);
  const { formatSavedDate } = useSavedDateFormatter();
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md"),
  );

  const quillCOnfig = {
    toolbar: false,
  };

  const handleSeeMore = useCallback(() => {
    setSeeMore(true);
  }, []);

  const handleSeeLess = useCallback(() => {
    setSeeMore(false);
  }, []);

  const isVideoUrl = (thumbnailUrl: string | null) => {
    if (!thumbnailUrl) return false;
    return thumbnailUrl.endsWith(".mp4") || thumbnailUrl.endsWith(".mov");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
            py: "10px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
            }}
          >
            {articleTitle}
          </Typography>
          {/* TODO - Replace with appropriate MUI component */}
          {savedDate && (
            <Button
              variant="contained"
              size="small"
              sx={{
                backgroundColor: "#F5F7FD",
                color: "#3A3A3A",
                fontSize: "14px",
                borderRadius: "20px",
                padding: "0px 10px",
                "&:hover": {
                  backgroundColor: "#F5F7FD",
                },
              }}
            >
              Saved on: {formatSavedDate(savedDate)}
            </Button>
          )}
        </Box>

        {!seeMore ? (
          <>
            {articleContent.length > myfeedConfig.ARTICLE_READ_MORE_LENGTH ? (
              <div className="quill-container">
                <ReactQuill
                  value={articleContent.slice(
                    0,
                    myfeedConfig.ARTICLE_READ_MORE_LENGTH,
                  )}
                  readOnly
                  theme="snow"
                  modules={quillCOnfig}
                />
                <SeeMoreButton onClick={handleSeeMore} />
              </div>
            ) : (
              <div className="quill-container">
                <ReactQuill
                  value={articleContent}
                  readOnly
                  theme="snow"
                  modules={quillCOnfig}
                />
              </div>
            )}
          </>
        ) : (
          <div className="quill-container">
            <ReactQuill
              value={articleContent}
              readOnly
              theme="snow"
              modules={quillCOnfig}
            />
            <SeeLessButton onClick={handleSeeLess} />
          </div>
        )}
      </Box>
      <Grid
        container
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          width: "100%",
          mb: "16px",
          backgroundColor: "secondary.main",
        }}
      >
        <Grid size={isSmallScreen ? 12 : 4}>
          {isVideoUrl(articleThumbnailUrl) ? (
            <CardMedia
              component="video"
              controls
              height="140"
              src={articleThumbnailUrl}
              sx={{
                maxWidth: "300px",
                height: "100%",
              }}
            />
          ) : (
            <CardMedia
              component="img"
              height="140"
              image={
                articleThumbnailUrl !== ""
                  ? articleThumbnailUrl
                  : "https://picsum.photos/200"
              }
              alt="image content"
              sx={{
                maxWidth: "300px",
                height: "100%",
              }}
            />
          )}
        </Grid>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "start",
            pr: isSmallScreen ? 2 : 10,
            pl: 2,
          }}
          size={isSmallScreen ? 12 : 8}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              py: "10px",
            }}
          >
            {articleTitle}
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "15px",
              marginBottom: "10px",
            }}
          >
            {articleDescription.length >
            myfeedConfig.SUMMARY_READ_MORE_LENGTH ? (
              <>
                {`${articleDescription.slice(
                  0,
                  myfeedConfig.SUMMARY_READ_MORE_LENGTH,
                )} ...`}
                <SeeMoreButton />
              </>
            ) : (
              articleDescription
            )}
          </Typography>
          <Grid
            container
            sx={{
              display: "flex",
              gap: "10px",
            }}
          >
            {articleTags.map((tag, index) => (
              <Grid key={index}>
                <Chip
                  label={tag}
                  variant="filled"
                  sx={{
                    color: "font.secondary",
                    backgroundColor: "common.lightGray",
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default PostCardContent;
