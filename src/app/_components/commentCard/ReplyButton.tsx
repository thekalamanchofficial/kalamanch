import ReplyIcon from "@mui/icons-material/Reply";
import { Button, type SxProps } from "@mui/material";

type ButtonProps = {
  style?: SxProps;
  props?: React.ComponentProps<typeof Button>;
};
const ReplyButton: React.FC<ButtonProps> = ({ style, props }) => {
  return (
    <Button
      size="small"
      sx={{
        ...style,
      }}
      {...props}
    >
      <ReplyIcon /> Reply
    </Button>
  );
};

export default ReplyButton;
