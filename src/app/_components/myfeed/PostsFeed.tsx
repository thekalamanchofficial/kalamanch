"use client";
import { Button, Card, CardContent, Box } from "@mui/material";
import React from "react";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import PostCardFooter from "./PostCardFooter";
import PostCardContent from "./PostCardContent";
import UserNameProfile from "./UserNameProfile";

const PostsFeed = () => {
  return (
    <>
      <Card sx={{ width: "100%", boxShadow: "none", px: "0px" }}>
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
            <UserNameProfile />
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

          <PostCardContent />

          <PostCardFooter />
        </CardContent>
      </Card>
    </>
  );
};

export default PostsFeed;
