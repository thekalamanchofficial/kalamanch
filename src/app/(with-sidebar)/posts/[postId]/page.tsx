import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import { PostStatus } from "@prisma/client";
import Post from "~/app/_components/post/Post";
import ShowMessage from "~/app/_components/showMessage/ShowMessage";
import { trpcServer } from "~/app/_trpc/server";
import transformDates from "~/app/_utils/transformDates";

const PostPage = async ({ params }: { params: { postId: string } }) => {
  const user = await currentUser();
  const userEmail = String(user?.emailAddresses[0]?.emailAddress);
  const post = await trpcServer.post.getPost(params.postId);
  const userFollowings = await trpcServer.user.getUserFollowings({
    userEmail,
  });
  const userLikedPosts = await trpcServer.likes.getUserLikedPost({
    userEmail,
    postStatus: PostStatus.PUBLISHED.toString().toUpperCase(),
  });
  const userBookmarks = await trpcServer.bookmarks.getUserBookmarkPosts({
    limit: null,
    userEmail,
  });

  const isLiked = userLikedPosts?.some((post) => post.id === params.postId);
  const isBookmarked = userBookmarks.items?.some((post) => post.id === params.postId);

  if (!post) {
    return (
      <ShowMessage
        title="No Posts Found."
        style={{
          height: "200px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    );
  }

  const processedPost = transformDates(post);

  return (
    <Post
      post={processedPost}
      isLiked={isLiked}
      userFollowing={userFollowings}
      isBookmarked={isBookmarked}
    />
  );
};

export default PostPage;

export const generateMetadata = async ({
  params,
}: {
  params: { postId: string };
}): Promise<Metadata> => {
  const post = await trpcServer.post.getPost(params.postId);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://kalamanch.org";

  if (!post) {
    return {
      title: "Post not found - Kalamanch",
      description: "The post you're looking for is not available on Kalamanch.",
      alternates: {
        canonical: `${baseUrl}/posts/${params.postId}`,
      },
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${post.title} - Kalamanch`;
  const description = post.content.slice(0, 150) || "Explore the latest post on Kalamanch.";
  const thumbnailUrl = post.thumbnailDetails.url.startsWith("http")
    ? post.thumbnailDetails.url
    : `${baseUrl}${post.thumbnailDetails.url}`;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/posts/${params.postId}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    keywords: [
      "Kalamanch",
      "Blog",
      "Writing",
      "Reading",
      "Social Media",
      "Community",
      "Art",
      post.title,
      ...(post.tags?.map((tag) => tag.name) || []),
    ],
    authors: [
      {
        name: post.authorName || "Kalamanch",
        url: `${baseUrl}/profile/${post.authorId || "default"}`,
      },
    ],
    openGraph: {
      title,
      description,
      url: `${baseUrl}/posts/${params.postId}`,
      siteName: "Kalamanch",
      type: "article",
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: [`${baseUrl}/profile/${post.authorId || "default"}`],
      images: [
        {
          url: thumbnailUrl,
          width: 1200,
          height: 630,
          alt: post.thumbnailDetails.title ?? "Kalamanch Post",
        },
      ],
      locale: "en_US",
      tags: post.tags?.map((tag) => tag.name) ?? [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [thumbnailUrl],
      site: "@kalamanch",
    },
    appleWebApp: {
      title,
      statusBarStyle: "default",
    },
    themeColor: "#ffffff",
    viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0",
  };
};
