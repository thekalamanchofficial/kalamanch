import type { Prisma } from "@prisma/client";
import prisma from "../db";

type PostWithTags = Prisma.PostGetPayload<{
  include: { tags: true };
}>;

export const sortPostsByPopularity = async (
  baseWhere: Prisma.PostWhereInput,
  limit: number,
  skip: number,
  totalCount: number,
) => {
  const posts = await prisma.post.findMany({
    where: baseWhere,
    include: {
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
      tags: true,
      genres: true,
      likes: true,
      comments: true,
      bids: true,
    },
  });

  const sortedPosts = posts
    .map((post) => ({
      ...post,
      popularityScore: post._count.likes * 2 + post._count.comments,
    }))
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(skip, skip + limit)
    .map(({ popularityScore: _, _count, ...rest }) => rest);

  const hasMore = totalCount > skip + sortedPosts.length;

  return {
    posts: sortedPosts,
    totalCount,
    hasMore,
  };
};

export const calculateRelevanceScore = (
  post: PostWithTags,
  searchTerms: string[],
  searchQuery: string,
): number => {
  let score = 0;
  const titleLower = post.title.toLowerCase();
  const contentLower = post.content.toLowerCase();

  if (titleLower === searchQuery.toLowerCase()) {
    score += 100;
  }

  searchTerms.forEach((term) => {
    if (titleLower.includes(term)) score += 10;
    if (contentLower.includes(term)) score += 5;

    if (new RegExp(`\\b${term}\\b`, "i").test(titleLower)) score += 5;
    if (new RegExp(`\\b${term}\\b`, "i").test(contentLower)) score += 2;
  });

  const tagNames = post.tags.map((tag) => tag.name.toLowerCase());
  searchTerms.forEach((term) => {
    if (tagNames.some((tag: string) => tag.includes(term))) score += 8;
    if (tagNames.some((tag: string) => tag === term)) score += 15;
  });

  return score;
};

export const sortPostsByRelevance = async (
  baseWhere: Prisma.PostWhereInput,
  searchTerms: string[],
  searchQuery: string,
  limit: number,
  skip: number,
  totalCount: number,
) => {
  const posts = await prisma.post.findMany({
    where: baseWhere,
    include: {
      tags: true,
      genres: true,
      likes: true,
      comments: true,
      bids: true,
    },
  });

  const sortedPosts = posts
    .map((post) => ({
      ...post,
      relevanceScore: calculateRelevanceScore(post, searchTerms, searchQuery),
    }))
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(skip, skip + limit)
    .map(({ relevanceScore: _, ...rest }) => rest);

  const hasMore = totalCount > skip + sortedPosts.length;

  return {
    posts: sortedPosts,
    totalCount,
    hasMore,
  };
};

export const createPostSearchCondition = (searchQuery: string): Prisma.PostWhereInput => {
  return {
    OR: [
      {
        title: {
          contains: searchQuery,
          mode: "insensitive" as Prisma.QueryMode,
        },
      },
      {
        content: {
          contains: searchQuery,
          mode: "insensitive" as Prisma.QueryMode,
        },
      },
      {
        authorName: {
          contains: searchQuery,
          mode: "insensitive" as Prisma.QueryMode,
        },
      },
      {
        tags: {
          some: {
            name: {
              contains: searchQuery,
              mode: "insensitive" as Prisma.QueryMode,
            },
          },
        },
      },
    ],
  };
};

export const createUserSearchCondition = (searchQuery: string): Prisma.UserWhereInput => {
  return {
    OR: [
      {
        name: {
          contains: searchQuery,
          mode: "insensitive" as Prisma.QueryMode,
        },
      },
      {
        bio: {
          contains: searchQuery,
          mode: "insensitive" as Prisma.QueryMode,
        },
      },
    ],
  };
};

export const sortProfilesByPopularity = async (
  baseWhere: Prisma.UserWhereInput,
  limit: number,
  skip: number,
  totalCount: number,
) => {
  const allUsers = await prisma.user.findMany({
    where: baseWhere,
    select: {
      id: true,
      name: true,
      bio: true,
      profileImageUrl: true,
      coverImageUrl: true,
      readingInterests: true,
      writingInterests: true,
      followers: true,
      following: true,
    },
  });

  const sortedUsers = allUsers
    .sort((a, b) => (b.followers?.length || 0) - (a.followers?.length || 0))
    .slice(skip, skip + limit);

  const hasMore = totalCount > skip + sortedUsers.length;

  return {
    profiles: sortedUsers,
    totalCount,
    hasMore,
  };
};

export const calculateProfileRelevanceScore = (
  profile: {
    name: string | null;
    bio: string | null;
  },
  searchTerms: string[],
  searchQuery: string,
  followerCount: number,
): number => {
  let score = 0;
  const nameLower = profile.name?.toLowerCase() ?? "";
  const bioLower = profile.bio?.toLowerCase() ?? "";

  if (nameLower === searchQuery.toLowerCase()) {
    score += 100;
  }

  searchTerms.forEach((term) => {
    if (nameLower.includes(term)) score += 15;
    if (bioLower.includes(term)) score += 5;

    if (new RegExp(`\\b${term}\\b`, "i").test(nameLower)) score += 10;
    if (new RegExp(`\\b${term}\\b`, "i").test(bioLower)) score += 3;
  });

  score += Math.min(followerCount * 0.5, 20);

  return score;
};

export const sortProfilesByRelevance = async (
  baseWhere: Prisma.UserWhereInput,
  searchTerms: string[],
  searchQuery: string,
  limit: number,
  skip: number,
  totalCount: number,
) => {
  const allUsers = await prisma.user.findMany({
    where: baseWhere,
    select: {
      id: true,
      name: true,
      bio: true,
      profileImageUrl: true,
      coverImageUrl: true,
      readingInterests: true,
      writingInterests: true,
      followers: true,
      following: true,
    },
  });

  const scoredUsers = allUsers.map((user) => ({
    ...user,
    relevanceScore: calculateProfileRelevanceScore(
      user,
      searchTerms,
      searchQuery,
      user.followers?.length || 0,
    ),
  }));

  const sortedUsers = scoredUsers
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(skip, skip + limit)
    .map(({ relevanceScore: _, ...rest }) => rest);

  const hasMore = totalCount > skip + sortedUsers.length;

  return {
    profiles: sortedUsers,
    totalCount,
    hasMore,
  };
};
