import { Button, type ButtonProps } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";

export default function ReplyButton(props: ButtonProps) {
  return (
    <Button size="small" {...props}>
      <ReplyIcon /> Reply
    </Button>
  );
}
