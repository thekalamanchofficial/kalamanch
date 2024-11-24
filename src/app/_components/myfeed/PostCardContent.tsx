import { Box, Button, CardMedia, Chip, Typography } from "@mui/material";
import React from "react";

const PostCardContent = () => {
  return (
    <>
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
          nesciunt atque veritatis numquam ipsum tempore ratione eaque sint quos
          repellat, eos fuga cum obcaecati at beatae, ullam totam inventore
          praesentium quo cumque commodi odio. Reiciendis tenetur rerum officia.
          Fugit ea aliquid optio vero tenetur nostrum, eum ex illum officia,
          neque quis? Itaque eveniet, odio error natus quaerat deserunt porro
          et, quam quis magnam sapiente?
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
                color: "primary.main",
                fontSize: "14px",
                ":hover": {
                  backgroundColor: "transparent",
                },
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
    </>
  );
};

export default PostCardContent;
