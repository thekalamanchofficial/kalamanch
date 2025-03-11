import { Container } from "@mui/material";
import ClientSearchPage from "./_components/ClientSearchPage";
import SearchHeader from "./_components/SearchHeader";
import {
  DEFAULT_FILTER_TYPE,
  DEFAULT_SORT_BY,
  type FilterTypeEnum,
  type SortByEnum,
} from "./_config/config";

type SearchPageProps = {
  searchParams: {
    q?: string;
    sortBy?: string;
    filterType?: string;
    profilesPage?: string;
    postsPage?: string;
  };
};

export default function SearchPage({ searchParams }: SearchPageProps) {
  const searchQuery = searchParams.q ?? "";
  const sortBy = searchParams.sortBy ?? DEFAULT_SORT_BY;
  const filterType = searchParams.filterType ?? DEFAULT_FILTER_TYPE;

  const profilesPage = searchParams.profilesPage ? parseInt(searchParams.profilesPage, 10) : 1;
  const postsPage = searchParams.postsPage ? parseInt(searchParams.postsPage, 10) : 1;

  return (
    <Container
      maxWidth="lg"
      sx={{
        pb: { xs: 4, sm: 8 },
        px: { xs: 1, sm: 2, md: 3 },
      }}
    >
      <SearchHeader searchQuery={searchQuery} />

      <ClientSearchPage
        searchQuery={searchQuery}
        initialSortBy={sortBy as SortByEnum}
        initialFilterType={filterType as FilterTypeEnum}
        initialProfilesPage={profilesPage}
        initialPostsPage={postsPage}
      />
    </Container>
  );
}

export const generateMetadata = async ({ searchParams }: SearchPageProps) => {
  const searchQuery = searchParams.q ?? "";

  return {
    title: `Search results for "${searchQuery}"`,
    description: `Search results for "${searchQuery}"`,
    openGraph: {
      title: `Search results for "${searchQuery}"`,
      description: `Search results for "${searchQuery}"`,
    },
    twitter: {
      title: `Search results for "${searchQuery}"`,
      description: `Search results for "${searchQuery}"`,
    },
    alternates: {
      canonical: `/search?q=${encodeURIComponent(searchQuery)}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
};
