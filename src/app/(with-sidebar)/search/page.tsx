import { Container } from "@mui/material";
import ClientSearchPage from "./_components/ClientSearchPage";
import SearchHeader from "./_components/SearchHeader";

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
  const sortBy = searchParams.sortBy ?? "recent";
  const filterType = searchParams.filterType ?? "all";

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
        initialSortBy={sortBy as "recent" | "popular" | "relevant"}
        initialFilterType={filterType as "all" | "people" | "posts"}
        initialProfilesPage={profilesPage}
        initialPostsPage={postsPage}
      />
    </Container>
  );
}
