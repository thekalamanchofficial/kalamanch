import { Grid2 as Grid, Paper, useMediaQuery } from "@mui/material";
import { useContext, useState, useRef, useEffect } from "react";
import ActionButton from "./ActionButton";
import { CommentType, DataContext, UserContext } from "./CommentSection";
import Content from "./Content";
import Counter from "./Counter";
import Editor from "../commentCard/Editor";
import Header from "./Header";

export default function Comment(comment: CommentType) {
  const { content, replyingTo, parentId, id } = comment;
  const matches = useMediaQuery("(min-width:600px)");
  const [editorState, setEditorState] = useState<{
    parentId?: number;
    replyingTo?: string;
  }>();
  const [_, setData] = useContext(DataContext);
  const user = useContext(UserContext);
  const editorRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleReplyClick = () => {
    setEditorState((prev) => ({
      ...prev,
      parentId: parentId ?? id,
      replyingTo: parentId ? comment.user.username : undefined,
    }));
  };

  useEffect(() => {
    if (editorState?.parentId && editorRef.current) {
      editorRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [editorState]);

  const handleReply = (reply: string) => {
    setData((prev) =>
      prev.map((item) => {
        if (item.id === editorState?.parentId) {
          return {
            ...item,
            replies: [
              ...(item.replies ?? []),
              {
                id: Date.now(),
                content: reply,
                createdAt: "right now",
                score: 0,
                user,
                replyingTo: comment.user.username,
              },
            ],
          };
        }
        return item;
      }),
    );

    setEditorState((prev) => ({
      ...prev,
      parentId: undefined,
      replyingTo: undefined,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const HeaderSlot = (
    <Header createdAt={comment.createdAt} user={comment.user} />
  );
  const CounterSlot = <Counter parentId={parentId} id={comment.id} />;
  const ActionButtonSlot = isEditing ? null : (
    <ActionButton
      handleEditClick={handleEditClick}
      handleReplyClick={handleReplyClick}
      comment={comment}
    />
  );
  const ContentSlot = (
    <Content
      isEditing={isEditing}
      replyingTo={replyingTo}
      content={content}
      id={id}
      parentId={parentId}
      setIsEditing={setIsEditing}
    />
  );

  const DesktopView = (
    <Grid spacing={2} justifyContent="space-between">
      <Grid spacing={1}>
        <Grid justifyContent="space-between">
          {HeaderSlot}
          {ActionButtonSlot}
        </Grid>
        {ContentSlot}
      </Grid>
    </Grid>
  );

  const replies = comment.replies ?? [];

  return (
    <>
      <Grid sx={{}}>
        <Paper
          sx={{
            padding: "1rem",
          }}
        >
          {DesktopView}
        </Paper>
      </Grid>
      {replies.length > 0 && (
        <Grid sx={{ marginTop: "1rem" }}>
          {replies.map((reply, index) => (
            <Grid key={reply.id}>
              <div
                style={{
                  zIndex: replies.length - index,
                  paddingLeft: matches ? "1rem" : 0,
                  borderLeft: "1px solid hsl(0, 0%, 75%)",
                  paddingTop: index > 0 ? "1rem" : 0,
                }}
              >
                <Comment parentId={id} {...reply} />
              </div>
            </Grid>
          ))}
          {editorState?.parentId && !editorState.replyingTo && (
            <Grid
              ref={editorRef}
              style={{
                paddingLeft: matches ? "1rem" : 0,
              }}
            >
              <div
                style={{
                  borderLeft: "1px solid hsl(0, 0%, 75%)",
                  padding: 0,
                  paddingLeft: "1rem",
                  paddingTop: "1rem",
                }}
              >
                <Editor
                  handleReply={handleReply}
                  replyingTo={comment.user.username}
                />
              </div>
            </Grid>
          )}
        </Grid>
      )}
      {editorState?.parentId && editorState.replyingTo && (
        <Grid
          sx={{
            paddingLeft: matches ? "1rem" : 0,
            width: "100%",
          }}
        >
          <Editor
            handleReply={handleReply}
            replyingTo={comment.user.username}
          />
        </Grid>
      )}
    </>
  );
}
