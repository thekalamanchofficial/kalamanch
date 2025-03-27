import React, { useCallback, useState } from "react";
import {
  Box,
  Button,
  CardMedia,
  Chip,
  Grid2 as Grid,
  Typography,
  useMediaQuery,
  type Theme,
} from "@mui/material";
import { myfeedConfig } from "~/app/(with-sidebar)/myfeed/_config/config";
import { type PostCardContentProps } from "~/app/(with-sidebar)/myfeed/types/types";
import SeeMoreButton from "../seeMoreButton/SeeMoreButton";
import "react-quill/dist/quill.snow.css";
import "./quillEditor.css";
import dynamic from "next/dynamic";
import ImageNotSupportedOutlinedIcon from "@mui/icons-material/ImageNotSupportedOutlined";
import useSavedDateFormatter from "~/app/(with-sidebar)/myfeed/_hooks/useSavedDateFormatter";
import SeeLessButton from "../seeLessButton/SeeLessButton";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const PostCardContent: React.FC<PostCardContentProps> = ({
  articleTitle,
  articleContent,
  savedDate,
  articleThumbnailUrl,
  articleThumbnailContent,
  articleThumbnailTitle,
  articleTags,
  showThumbnail,
}) => {
  const [seeMore, setSeeMore] = useState(false);
  const { formatSavedDate } = useSavedDateFormatter();
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  const quillConfig = {
    toolbar: false,
  };

  const handleSeeMore = useCallback(() => {
    setSeeMore(true);
  }, []);

  const handleSeeLess = useCallback(() => {
    setSeeMore(false);
  }, []);

  const isVideoUrl = (thumbnailUrl: string | null | undefined) => {
    if (!thumbnailUrl) return false;
    return thumbnailUrl.endsWith(".mp4") || thumbnailUrl.endsWith(".mov");
  };

  const renderQuillContent = (content: string, isArticleThumbnailContent: boolean) => {
    const shouldShowSeeMore = !seeMore && content.length > myfeedConfig.SUMMARY_READ_MORE_LENGTH;
    const displayedContent =
      shouldShowSeeMore || isArticleThumbnailContent
        ? content.slice(0, myfeedConfig.SUMMARY_READ_MORE_LENGTH)
        : content;

    return (
      <div className="quill-container">
        <ReactQuill value={displayedContent} readOnly theme="snow" modules={quillConfig} />
        {shouldShowSeeMore && <SeeMoreButton onClick={handleSeeMore} />}
        {!isArticleThumbnailContent && seeMore && <SeeLessButton onClick={handleSeeLess} />}
      </div>
    );
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

        {renderQuillContent(articleContent, false)}
      </Box>
      {showThumbnail && (
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
                height="220"
                src={articleThumbnailUrl}
                sx={{
                  maxWidth: "300px",
                }}
              />
            ) : articleThumbnailUrl ? (
              <CardMedia
                component="img"
                height="220"
                image={articleThumbnailUrl}
                alt="image content"
                sx={{
                  maxWidth: "300px",
                }}
              />
            ) : (
              <ImageNotSupportedOutlinedIcon
                sx={{
                  fontSize: "220px",
                  color: "text.secondary",
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
              {articleThumbnailTitle ? articleThumbnailTitle : articleTitle}
            </Typography>
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: "15px",
                marginBottom: "10px",
              }}
              component="div"
            >
              {articleThumbnailContent &&
              articleThumbnailContent?.length > myfeedConfig.SUMMARY_READ_MORE_LENGTH ? (
                <>
                  {`${articleThumbnailContent?.slice(0, myfeedConfig.SUMMARY_READ_MORE_LENGTH)} ...`}
                  <SeeMoreButton />
                </>
              ) : (
                articleThumbnailContent
              )}
              {!articleThumbnailContent && renderQuillContent(articleContent, true)}
            </Typography>
            {/* <Grid
              container
              sx={{
                display: "flex",
                gap: "10px",
              }}
            >
              {articleTags?.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag.name}
                  variant="filled"
                  sx={{
                    color: "font.secondary",
                    backgroundColor: "common.lightGray",
                  }}
                />
              ))}
            </Grid> */}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default PostCardContent;
