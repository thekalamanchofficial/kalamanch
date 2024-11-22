import {
  Button,
  Typography,
  Grid2 as Grid,
  Box,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import userImage from "~/assets/images/user.jpeg";

const RightSideBar = () => {
  return (
    <>
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
    </>
  );
};

export default RightSideBar;
