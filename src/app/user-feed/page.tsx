import * as React from "react";
import {
  Grid2 as Grid,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";
import OwlSVG from "~/assets/svg/owl.svg";
import WriteLogo from "~/assets/svg/writeLogo.svg";

import { MENU_ITEMS } from "./_config/config";
import userImage from "~/assets/images/user.jpeg";

//
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import MessageIcon from "@mui/icons-material/Message";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import Image from "next/image";
import PostsFeed from "../_components/userFeed/PostsFeed";
//
const ICONS_MAP = {
  HomeIcon: HomeOutlinedIcon,
  SearchIcon: SearchIcon,
  MenuBookIcon: MenuBookIcon,
  StarOutlineIcon: StarOutlineIcon,
  MessagesIcon: MessageIcon,
  BookmarkBorderOutlinedIcon: BookmarkBorderOutlinedIcon,
  ShoppingCartOutlinedIcon: ShoppingCartOutlinedIcon,
  SettingsOutlinedIcon: SettingsOutlinedIcon,
  AccountCircleOutlinedIcon: AccountCircleOutlinedIcon,
};

const UserFeedPage = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "#fafafa",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        container
        sx={{
          height: "100vh",
          width: "90%",
          justifyContent: "center",
          alignItems: "center",
          px: 6,
          py: 6,
        }}
        spacing={4}
      >
        <Grid
          size={2}
          sx={{
            height: "100%",
          }}
        >
          <Grid
            columns={1}
            sx={{
              height: "100%",
              width: "100%",
              spacing: 3,
              backgroundColor: "white",
              position: "relative",
              py: 1,
              px: "8px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                px: 2,
              }}
            >
              <OwlSVG />
              <Typography variant="h5" fontWeight="bold" color="primary">
                {STATIC_TEXTS.APP_TITLE}
              </Typography>
            </Box>
            <Box sx={{ borderBottom: 1, borderColor: "grey.300" }}></Box>
            <Box
              sx={{
                marginTop: 4,
              }}
            >
              <Button
                startIcon={<WriteLogo />}
                variant="contained"
                size="small"
                fullWidth
                sx={{
                  display: "flex",
                  height: "40px",
                  backgroundColor: "primary.main",
                  justifyContent: "start",
                  alignItems: "center",
                  px: "12px",
                }}
              >
                <Typography
                  variant="h6"
                  color="#fff"
                  style={{
                    fontSize: "16px",
                  }}
                >
                  {STATIC_TEXTS.USER_FEED.BUTTONS.WRITE}
                </Typography>
              </Button>
            </Box>
            <Box
              sx={{
                marginTop: 2,
              }}
            >
              {MENU_ITEMS.map((item, index) => {
                const IconComponent = ICONS_MAP[item.icon];

                return (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "center",
                      px: "2px",
                      py: "4px",
                    }}
                  >
                    <Button
                      startIcon={<IconComponent />}
                      variant="text"
                      size="small"
                      fullWidth
                      sx={{
                        display: "flex",
                        height: "40px",
                        justifyContent: "start",
                        alignItems: "center",
                        color: "text.secondary",
                        marginLeft: "4px",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "18px",
                          fontWeight: "500",
                          color: "text.secondary",
                        }}
                      >
                        {item.label}
                      </Typography>
                    </Button>
                  </Box>
                );
              })}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                position: "absolute",
                bottom: "0",
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
                    fontWeight: "semibold",
                    color: "text.secondary",
                    marginLeft: "4px",
                  }}
                >
                  Steve Jobs
                </Typography>
              </Box>
              <Box>
                <Button
                  startIcon={<MoreHorizOutlinedIcon />}
                  sx={{ color: "text.secondary" }}
                  size="small"
                ></Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid
          size={8}
          sx={{
            height: "100%",
            backgroundColor: "white",
          }}
        >
          <PostsFeed />
        </Grid>
        <Grid
          size={2}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "5px",
              width: "100%",
              height: "51%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "start",
              px: "12px",
            }}
          >
            <Typography
              sx={{
                color: "text.primary",
                fontSize: "18px",
                fontWeight: "550",
                py: "6px",
              }}
            >
              Featured Writings
            </Typography>
            <Grid container spacing={1}>
              <Grid size={12}>
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
                  <Typography sx={{ color: "font.primary", fontWeight: "500" }}>
                    सपनों के परिंदे
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      py: "8px",
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
                        width={25}
                        height={25}
                        style={{
                          borderRadius: "100%",
                        }}
                      ></Image>
                      <Typography
                        sx={{
                          fontSize: "15px",
                          fontWeight: "semibold",
                          color: "text.secondary",
                          marginLeft: "8px",
                        }}
                      >
                        Steve Jobs
                      </Typography>
                    </Box>
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
                        320
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid size={12}>
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
                  <Typography sx={{ color: "font.primary", fontWeight: "500" }}>
                    सपनों के परिंदे
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      py: "8px",
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
                        width={25}
                        height={25}
                        style={{
                          borderRadius: "100%",
                        }}
                      ></Image>
                      <Typography
                        sx={{
                          fontSize: "15px",
                          fontWeight: "semibold",
                          color: "text.secondary",
                          marginLeft: "8px",
                        }}
                      >
                        Steve Jobs
                      </Typography>
                    </Box>
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
                        320
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid size={12}>
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
                  <Typography sx={{ color: "font.primary", fontWeight: "500" }}>
                    सपनों के परिंदे
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      py: "8px",
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
                        width={25}
                        height={25}
                        style={{
                          borderRadius: "100%",
                        }}
                      ></Image>
                      <Typography
                        sx={{
                          fontSize: "15px",
                          fontWeight: "semibold",
                          color: "text.secondary",
                          marginLeft: "8px",
                        }}
                      >
                        Steve Jobs
                      </Typography>
                    </Box>
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
                        320
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid size={12}>
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
                  <Typography sx={{ color: "font.primary", fontWeight: "500" }}>
                    सपनों के परिंदे
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      py: "8px",
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
                        width={25}
                        height={25}
                        style={{
                          borderRadius: "100%",
                        }}
                      ></Image>
                      <Typography
                        sx={{
                          fontSize: "15px",
                          fontWeight: "semibold",
                          color: "text.secondary",
                          marginLeft: "8px",
                        }}
                      >
                        Steve Jobs
                      </Typography>
                    </Box>
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
                        320
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid size={12}>
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
                  <Typography sx={{ color: "font.primary", fontWeight: "500" }}>
                    सपनों के परिंदे
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      py: "8px",
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
                        width={25}
                        height={25}
                        style={{
                          borderRadius: "100%",
                        }}
                      ></Image>
                      <Typography
                        sx={{
                          fontSize: "15px",
                          fontWeight: "semibold",
                          color: "text.secondary",
                          marginLeft: "8px",
                        }}
                      >
                        Steve Jobs
                      </Typography>
                    </Box>
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
                        320
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
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
              height: "45%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "start",
              px: "12px",
            }}
          >
            <Typography
              sx={{
                color: "text.primary",
                fontSize: "18px",
                fontWeight: "550",
                py: "6px",
                marginBottom: "10px",
              }}
            >
              Top writers to follow
            </Typography>
            <Grid container spacing={2}>
              <Grid size={12}>
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
                  <Image
                    alt="profile picture "
                    src={userImage}
                    width={40}
                    height={40}
                    style={{
                      borderRadius: "100%",
                    }}
                  ></Image>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "start",
                      alignItems: "start",
                      width: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "15px",
                        color: "text.primary",
                        marginLeft: "8px",
                      }}
                    >
                      Steve Jobs
                    </Typography>
                    <Button
                      sx={{
                        backgroundColor: "secondary.main",
                        color: "primary.main",
                        minHeight: "auto",
                        height: "20px",
                        padding: "3px 4px ",
                        margin: "3px 5px ",
                        fontSize: "15px",
                      }}
                    >
                      Follow
                    </Button>
                  </Box>
                </Box>
              </Grid>
              <Grid size={12}>
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
                  <Image
                    alt="profile picture "
                    src={userImage}
                    width={40}
                    height={40}
                    style={{
                      borderRadius: "100%",
                    }}
                  ></Image>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "start",
                      alignItems: "start",
                      width: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "15px",
                        color: "text.primary",
                        marginLeft: "8px",
                      }}
                    >
                      Steve Jobs
                    </Typography>
                    <Button
                      sx={{
                        backgroundColor: "secondary.main",
                        color: "primary.main",
                        minHeight: "auto",
                        height: "20px",
                        padding: "3px 4px ",
                        margin: "3px 5px ",
                        fontSize: "15px",
                      }}
                    >
                      Follow
                    </Button>
                  </Box>
                </Box>
              </Grid>
              <Grid size={12}>
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
                  <Image
                    alt="profile picture "
                    src={userImage}
                    width={40}
                    height={40}
                    style={{
                      borderRadius: "100%",
                    }}
                  ></Image>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "start",
                      alignItems: "start",
                      width: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "15px",
                        color: "text.primary",
                        marginLeft: "8px",
                      }}
                    >
                      Steve Jobs
                    </Typography>
                    <Button
                      sx={{
                        backgroundColor: "secondary.main",
                        color: "primary.main",
                        minHeight: "auto",
                        height: "20px",
                        padding: "3px 4px ",
                        margin: "3px 5px ",
                        fontSize: "15px",
                      }}
                    >
                      Follow
                    </Button>
                  </Box>
                </Box>
              </Grid>
              <Grid size={12}>
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
                  <Image
                    alt="profile picture "
                    src={userImage}
                    width={40}
                    height={40}
                    style={{
                      borderRadius: "100%",
                    }}
                  ></Image>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "start",
                      alignItems: "start",
                      width: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "15px",
                        color: "text.primary",
                        marginLeft: "8px",
                      }}
                    >
                      Steve Jobs
                    </Typography>
                    <Button
                      sx={{
                        backgroundColor: "secondary.main",
                        color: "primary.main",
                        minHeight: "auto",
                        height: "20px",
                        padding: "3px 4px ",
                        margin: "3px 5px ",
                        fontSize: "15px",
                      }}
                    >
                      Follow
                    </Button>
                  </Box>
                </Box>
              </Grid>
              <Grid size={12}>
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
                  <Image
                    alt="profile picture "
                    src={userImage}
                    width={40}
                    height={40}
                    style={{
                      borderRadius: "100%",
                    }}
                  ></Image>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "start",
                      alignItems: "start",
                      width: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "15px",
                        color: "text.primary",
                        marginLeft: "8px",
                      }}
                    >
                      Steve Jobs
                    </Typography>
                    <Button
                      sx={{
                        backgroundColor: "secondary.main",
                        color: "primary.main",
                        minHeight: "auto",
                        height: "20px",
                        padding: "3px 4px ",
                        margin: "3px 5px ",
                        fontSize: "15px",
                      }}
                    >
                      Follow
                    </Button>
                  </Box>
                </Box>
              </Grid>
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
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserFeedPage;
