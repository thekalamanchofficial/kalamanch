// "use client";
// import React, { useState } from "react";
// import WritingPad from "../_components/writingPad/WritingPad";
// import { Box, Grid2 as Grid } from "@mui/material";
// import CustomTabs from "../_components/CustomTabs/CustomTabs";
// import { tabs } from "./_config/config";
// import { EditorTabsEnum } from "./types/types";
// import CreatePostForm from "./_components/createPostForm/CreatePostForm";
// import editorMockData from "./mockDataEditor/mockdata";

// const Page = () => {
//   const [tab, setTab] = useState(EditorTabsEnum.EDITOR);
//   const [isCreatePostFormOpen, setIsCreatePostFormOpen] = useState(false);

//   const handleChange = (newTab: EditorTabsEnum) => {
//     setTab(newTab);
//   };

//   const handleClose = () => {
//     setIsCreatePostFormOpen(false);
//   };
//   const handleOpen = () => {
//     setIsCreatePostFormOpen(true);
//   };

//   return (
//     <Box
//       sx={{
//         height: "100%",
//         width: "100%",
//       }}
//     >
//       <Grid
//         size={12}
//         sx={{
//           display: "flex",
//           justifyContent: "start",
//           alignItems: "start",
//           px: "4px",
//           pt: "8px",
//         }}
//       >
//         <CustomTabs tabs={tabs} activeTab={tab} onTabChange={handleChange} />
//       </Grid>
//       <Grid
//         size={12}
//         sx={{
//           height: "100%",
//           width: "100%",
//           overflowY: "scroll",
//           scrollbarWidth: "none",
//         }}
//       >
//         <WritingPad
//           handleOpen={handleOpen}
//           editorPostData={editorMockData.editorPost}
//         />
//       </Grid>
//       {isCreatePostFormOpen ? (
//         <CreatePostForm
//           handleClose={handleClose}
//           open={isCreatePostFormOpen}
//           createPostFormData={editorMockData.editorPost.metadata}
//         />
//       ) : null}
//     </Box>
//   );
// };

// export default Page;

"use client";
import React, { useState } from "react";
import WritingPad from "../_components/writingPad/WritingPad";
import { Box, Grid2 as Grid } from "@mui/material";
import CustomTabs from "../_components/CustomTabs/CustomTabs";
import { tabs } from "./_config/config";
import { type CreatePostFormType, EditorTabsEnum } from "./types/types";
import CreatePostForm from "./_components/createPostForm/CreatePostForm";
import editorMockData from "./mockDataEditor/mockdata";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const [tab, setTab] = useState(EditorTabsEnum.EDITOR);
  const [isCreatePostFormOpen, setIsCreatePostFormOpen] = useState(false);

  const searchParams = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());

  const handleChange = (newTab: EditorTabsEnum) => {
    setTab(newTab);
  };

  const handleClose = () => {
    setIsCreatePostFormOpen(false);
  };
  const handleOpen = () => {
    setIsCreatePostFormOpen(true);
  };

  const formData: CreatePostFormType = {
    title: queryParams.title ?? "",
    actors: queryParams.actors ? queryParams.actors.split(",") : [],
    thumbnailUrl: queryParams.thumbnailUrl ?? "",
    tags: queryParams.tags?.split(",") ?? [],
    postType: queryParams.postType ?? "",
    targetAudience: queryParams.targetAudience?.split(",") ?? [],
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
      }}
    >
      <Grid
        size={12}
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "start",
          px: "4px",
          pt: "8px",
        }}
      >
        <CustomTabs tabs={tabs} activeTab={tab} onTabChange={handleChange} />
      </Grid>
      <Grid
        size={12}
        sx={{
          height: "100%",
          width: "100%",
          overflowY: "scroll",
          scrollbarWidth: "none",
        }}
      >
        <WritingPad
          handleOpen={handleOpen}
          editorPostData={editorMockData.editorPost}
        />
      </Grid>
      {isCreatePostFormOpen ? (
        <CreatePostForm
          handleClose={handleClose}
          open={isCreatePostFormOpen}
          createPostFormData={formData}
        />
      ) : null}
    </Box>
  );
};

export default Page;
