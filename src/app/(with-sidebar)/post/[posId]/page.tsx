import { currentUser, getAuth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import Post from "~/app/_components/post/Post";
import { trpcServer } from "~/app/_trpc/server";
import transformDates from "~/app/_utils/transformDates";

const PostPage = async ({ params }: { params: { posId: string } }) => {
  const user = await currentUser();
  const userEmail = String(user?.emailAddresses[0]?.emailAddress);
  const post = await trpcServer.post.getPost(params.posId);
  const userFollowings = await trpcServer.user.getUserFollowings({
    userEmail,
  });
  const userLikedPosts = await trpcServer.likes.getUserLikedPost({
    userEmail,
  });

  const isLiked = userLikedPosts?.some((post) => post.id === params.posId);

  if (!post) {
    return <div>Post not found</div>;
  }

  const processedPost = transformDates(post);

  return (
    <Post
      post={processedPost}
      isLiked={isLiked}
      userFollowing={userFollowings}
    />
  );
};

export default PostPage;

export const generateMetadata = async ({
  params,
}: {
  params: { posId: string };
}): Promise<Metadata> => {
  const post = await trpcServer.post.getPost(params.posId);

  if (!post) {
    return {
      title: "Post not found - Kalamanch",
      description: "The post you're looking for is not available on Kalamanch.",
      alternates: {
        canonical: `https://kalamanch.com/posts/${params.posId}`,
      },
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description =
    post.content.slice(0, 150) || "Explore the latest post on Kalamanch.";
  const thumbnailUrl =
    post.postDetails.thumbnailDetails.url ||
    "https://kalamanch.com/default-thumbnail.jpg";
  const title = `${post.postDetails.title} - Kalamanch`;

  return {
    title,
    description,
    twitter: {
      card: thumbnailUrl ? "summary_large_image" : "summary",
      title,
      description,
      images: [thumbnailUrl],
    },
    alternates: {
      canonical: `https://kalamanch.com/posts/${params.posId}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    appleWebApp: {
      title,
      statusBarStyle: "default",
    },
    keywords: [
      "Kalamanch",
      "Blog",
      "Writing",
      "Reading",
      "Social Media",
      "Community",
      "Art",
      post.postDetails.title,
      ...(post.postDetails.tags || []),
    ],
    authors: [
      {
        name: post.authorName || "Kalamanch",
        url: `https://kalamanch.com/authors/${post.authorId || "default"}`,
      },
    ],
    openGraph: {
      title,
      description,
      url: `https://kalamanch.com/posts/${params.posId}`,
      siteName: "Kalamanch",
      type: "article",
      publishedTime: post.createdAt.toString(),
      modifiedTime: post.updatedAt.toString(),
      authors: [`https://kalamanch.com/authors/${post.authorId || "default"}`],
      images: [
        {
          url: thumbnailUrl,
          width: 1200,
          height: 630,
          alt: post.postDetails.title || "Kalamanch Post",
        },
      ],
      locale: "en_US",
    },
    themeColor: "#ffffff",
    viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0",
  };
};
