export const followWriter = (writerName: string, writerProfileLink: string) => {
  console.log(`followed writer ${writerName} ${writerProfileLink} `);
};

export interface FeaturedArticle {
  profilePicture: string;
  writerName: string;
  articleName: string;
  articleLink: string;
  writerProfileLink: string;
  likes: number;
}

export interface WriterToFollow {
  profilePicture: string;
  writerName: string;
  writerProfileLink: string;
}

export interface MenuItemList {
  label: string;
  route: string;
  icon: React.ReactNode;
}

// import { currentUser } from "@clerk/nextjs/server";

// const getUserInfo = async () => {
//   const user = await currentUser();
//   console.log(user);
// };

// export const data = await getUserInfo();
