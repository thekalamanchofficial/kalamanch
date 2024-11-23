"use client";
import {
  Button,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  IconButton,
  Chip,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import userImage from "~/assets/images/user.jpeg";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MessageIcon from "@mui/icons-material/Message";
import SendIcon from "@mui/icons-material/Send";
import TollIcon from "@mui/icons-material/Toll";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

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
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam
              itaque labore quisquam repellendus rem nisi exercitationem minus
              impedit non dolorem. Quasi, assumenda est? Pariatur reprehenderit
              nesciunt atque veritatis numquam ipsum tempore ratione eaque sint
              quos repellat, eos fuga cum obcaecati at beatae, ullam totam
              inventore praesentium quo cumque commodi odio. Reiciendis tenetur
              rerum officia. Fugit ea aliquid optio vero tenetur nostrum, eum ex
              illum officia, neque quis? Itaque eveniet, odio error natus
              quaerat deserunt porro et, quam quis magnam sapiente?
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
              justifyContent: "start",
              alignItems: "center",
              width: "100%",
              mb: "16px",
              height: "250px",
              backgroundColor: "secondary.main",
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image="https://fastly.picsum.photos/id/609/200/300.jpg?hmac=jkFe_vvVM_tvHdIFYhYtG6uWYznjI6zHzJpfOWfHGiU"
              alt="green iguana"
              sx={{
                width: "80%",
                height: "100%",
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "start",
                pr: 10,
                pl: 2,
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
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Repellendus quaerat, delectus in modi cumque unde sit nam vitae
                assumenda enim pariatur, suscipit facere explicabo est deserunt
                obcaecati accusantium commodi sapiente! asdasd
                <Button
                  variant="text"
                  sx={{
                    minHeight: "auto",
                    width: "auto",
                    height: "10px",
                    // display: "inline",
                    color: "primary.main",
                    fontSize: "14px",
                    ":hover": {
                      backgroundColor: "transparent",
                    },
                    // textAlign: "left",
                  }}
                  disableTouchRipple
                >
                  See more
                </Button>
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                }}
              >
                <Chip
                  label="Memories"
                  variant="filled"
                  sx={{
                    color: "font.secondary",
                    backgroundColor: "common.lightGray",
                  }}
                />
                <Chip
                  label="Nostalgia"
                  variant="filled"
                  sx={{
                    color: "font.secondary",
                    backgroundColor: "common.lightGray",
                  }}
                />
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Chip
                avatar={<FavoriteBorderIcon />}
                label="320"
                sx={{
                  padding: "4px ",
                  backgroundColor: "common.lightGray",
                  fontSize: "14px",
                }}
              />

              <Chip
                avatar={<MessageIcon />}
                label="24"
                sx={{
                  padding: "4px ",
                  backgroundColor: "common.lightGray",
                  fontSize: "14px",
                }}
              />
              <Chip
                avatar={<TollIcon />}
                label="24"
                sx={{
                  padding: "4px ",
                  backgroundColor: "common.lightGray",
                  fontSize: "14px",
                }}
              />
              <Chip
                avatar={<SendIcon />}
                label="24"
                sx={{
                  padding: "4px ",
                  fontSize: "14px",
                  backgroundColor: "common.lightGray",
                }}
              />
            </Box>
            <Box>
              <IconButton
                sx={{
                  backgroundColor: "common.lightGray",
                }}
                size="small"
              >
                <BookmarkBorderIcon />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>
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
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam
              itaque labore quisquam repellendus rem nisi exercitationem minus
              impedit non dolorem. Quasi, assumenda est? Pariatur reprehenderit
              nesciunt atque veritatis numquam ipsum tempore ratione eaque sint
              quos repellat, eos fuga cum obcaecati at beatae, ullam totam
              inventore praesentium quo cumque commodi odio. Reiciendis tenetur
              rerum officia. Fugit ea aliquid optio vero tenetur nostrum, eum ex
              illum officia, neque quis? Itaque eveniet, odio error natus
              quaerat deserunt porro et, quam quis magnam sapiente?
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
              justifyContent: "start",
              alignItems: "center",
              width: "100%",
              mb: "16px",
              height: "250px",
              backgroundColor: "secondary.main",
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image="https://fastly.picsum.photos/id/609/200/300.jpg?hmac=jkFe_vvVM_tvHdIFYhYtG6uWYznjI6zHzJpfOWfHGiU"
              alt="green iguana"
              sx={{
                width: "80%",
                height: "100%",
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "start",
                pr: 10,
                pl: 2,
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
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Repellendus quaerat, delectus in modi cumque unde sit nam vitae
                assumenda enim pariatur, suscipit facere explicabo est deserunt
                obcaecati accusantium commodi sapiente! asdasd
                <Button
                  variant="text"
                  sx={{
                    minHeight: "auto",
                    width: "auto",
                    height: "10px",
                    // display: "inline",
                    color: "primary.main",
                    fontSize: "14px",
                    ":hover": {
                      backgroundColor: "transparent",
                    },
                    // textAlign: "left",
                  }}
                  disableTouchRipple
                >
                  See more
                </Button>
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                }}
              >
                <Chip
                  label="Memories"
                  variant="filled"
                  sx={{
                    color: "font.secondary",
                    backgroundColor: "common.lightGray",
                  }}
                />
                <Chip
                  label="Nostalgia"
                  variant="filled"
                  sx={{
                    color: "font.secondary",
                    backgroundColor: "common.lightGray",
                  }}
                />
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Chip
                avatar={<FavoriteBorderIcon />}
                label="320"
                sx={{
                  padding: "4px ",
                  backgroundColor: "common.lightGray",
                  fontSize: "14px",
                }}
              />

              <Chip
                avatar={<MessageIcon />}
                label="24"
                sx={{
                  padding: "4px ",
                  backgroundColor: "common.lightGray",
                  fontSize: "14px",
                }}
              />
              <Chip
                avatar={<TollIcon />}
                label="24"
                sx={{
                  padding: "4px ",
                  backgroundColor: "common.lightGray",
                  fontSize: "14px",
                }}
              />
              <Chip
                avatar={<SendIcon />}
                label="24"
                sx={{
                  padding: "4px ",
                  fontSize: "14px",
                  backgroundColor: "common.lightGray",
                }}
              />
            </Box>
            <Box>
              <IconButton
                sx={{
                  backgroundColor: "common.lightGray",
                }}
                size="small"
              >
                <BookmarkBorderIcon />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>
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
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam
              itaque labore quisquam repellendus rem nisi exercitationem minus
              impedit non dolorem. Quasi, assumenda est? Pariatur reprehenderit
              nesciunt atque veritatis numquam ipsum tempore ratione eaque sint
              quos repellat, eos fuga cum obcaecati at beatae, ullam totam
              inventore praesentium quo cumque commodi odio. Reiciendis tenetur
              rerum officia. Fugit ea aliquid optio vero tenetur nostrum, eum ex
              illum officia, neque quis? Itaque eveniet, odio error natus
              quaerat deserunt porro et, quam quis magnam sapiente?
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
              justifyContent: "start",
              alignItems: "center",
              width: "100%",
              mb: "16px",
              height: "250px",
              backgroundColor: "secondary.main",
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image="https://fastly.picsum.photos/id/609/200/300.jpg?hmac=jkFe_vvVM_tvHdIFYhYtG6uWYznjI6zHzJpfOWfHGiU"
              alt="green iguana"
              sx={{
                width: "80%",
                height: "100%",
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "start",
                pr: 10,
                pl: 2,
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
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Repellendus quaerat, delectus in modi cumque unde sit nam vitae
                assumenda enim pariatur, suscipit facere explicabo est deserunt
                obcaecati accusantium commodi sapiente! asdasd
                <Button
                  variant="text"
                  sx={{
                    minHeight: "auto",
                    width: "auto",
                    height: "10px",
                    // display: "inline",
                    color: "primary.main",
                    fontSize: "14px",
                    ":hover": {
                      backgroundColor: "transparent",
                    },
                    // textAlign: "left",
                  }}
                  disableTouchRipple
                >
                  See more
                </Button>
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                }}
              >
                <Chip
                  label="Memories"
                  variant="filled"
                  sx={{
                    color: "font.secondary",
                    backgroundColor: "common.lightGray",
                  }}
                />
                <Chip
                  label="Nostalgia"
                  variant="filled"
                  sx={{
                    color: "font.secondary",
                    backgroundColor: "common.lightGray",
                  }}
                />
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Chip
                avatar={<FavoriteBorderIcon />}
                label="320"
                sx={{
                  padding: "4px ",
                  backgroundColor: "common.lightGray",
                  fontSize: "14px",
                }}
              />

              <Chip
                avatar={<MessageIcon />}
                label="24"
                sx={{
                  padding: "4px ",
                  backgroundColor: "common.lightGray",
                  fontSize: "14px",
                }}
              />
              <Chip
                avatar={<TollIcon />}
                label="24"
                sx={{
                  padding: "4px ",
                  backgroundColor: "common.lightGray",
                  fontSize: "14px",
                }}
              />
              <Chip
                avatar={<SendIcon />}
                label="24"
                sx={{
                  padding: "4px ",
                  fontSize: "14px",
                  backgroundColor: "common.lightGray",
                }}
              />
            </Box>
            <Box>
              <IconButton
                sx={{
                  backgroundColor: "common.lightGray",
                }}
                size="small"
              >
                <BookmarkBorderIcon />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default PostsFeed;
