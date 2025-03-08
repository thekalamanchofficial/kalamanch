import type { Post } from "@prisma/client";

export interface SearchResultsPopupProps {
  searchQuery: string;
  onClose?: () => void;
}

export interface Profile {
  id: string;
  name: string;
  bio: string | null;
  profileImageUrl: string;
}

export interface SearchResults {
  profiles: Profile[];
  posts: Post[];
}
