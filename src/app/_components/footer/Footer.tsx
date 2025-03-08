import Link from "next/link";
import { Box, Divider, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        textAlign: "center",
        position: "sticky",
        bottom: 0,
        left: 0,
        backgroundColor: "#FFF",
      }}
    >
      <Divider />
      <Typography variant="body2" color="textSecondary" mt={2}>
        © {new Date().getFullYear()} Kalamanch. All rights reserved.
      </Typography>
      <Box display="flex" justifyContent="center" gap={3} my={1}>
        <Link href="/about" style={{ textDecoration: "none", color: "inherit" }}>
          <Typography variant="body2" color="primary.main">
            About
          </Typography>
        </Link>
        <Link href="/contactUs" style={{ textDecoration: "none", color: "inherit" }}>
          <Typography variant="body2" color="primary.main">
            Contact
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};
