import { Button, ButtonProps, Grid } from "@mui/material";

interface IconButtonProps extends ButtonProps {
  icon: React.ReactNode;
}

export default function IconButton({ icon, ...props }: IconButtonProps) {
  return (
    <Grid item>
      <Button
        size="small"
        startIcon={<img src={icon} alt={"" + props.children} />}
        sx={{
          fontWeight: "bold",
          fontSize: "14px",
          textTransform: "none",
          "&:hover": {
            opacity: 0.5,
          },
        }}
        {...props}
      />
    </Grid>
  );
}
