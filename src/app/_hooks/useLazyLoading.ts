import { useCallback, useEffect } from "react";

type UseLazyLoadingArgs = {
  queryLoading: boolean;
  error: string;
  initialLimit: number;
  limit: number;
  skip: number;
  setSkip: React.Dispatch<React.SetStateAction<number>>;
  hasMoreData: boolean;
  setHasMoreData: React.Dispatch<React.SetStateAction<boolean>>;
};

type UseLazyLoadingReturn = {
  handleScroll: () => void;
};

type UseLazyLoading = (args: UseLazyLoadingArgs) => UseLazyLoadingReturn;

const useLazyLoading: UseLazyLoading = ({
  queryLoading,
  error,
  initialLimit,
  limit,
  setSkip,
  hasMoreData,
  setHasMoreData,
}) => {
  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const bottomReached = scrollHeight - scrollTop - clientHeight < 10;

    if (bottomReached && !queryLoading && !error) {
      setHasMoreData(hasMoreData);
      setSkip((prev) => (prev == 0 ? initialLimit + prev : prev + limit));
    }
  }, [
    error,
    hasMoreData,
    initialLimit,
    limit,
    queryLoading,
    setHasMoreData,
    setSkip,
  ]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, hasMoreData, queryLoading]);

  return {
    handleScroll,
  };
};
export default useLazyLoading;
