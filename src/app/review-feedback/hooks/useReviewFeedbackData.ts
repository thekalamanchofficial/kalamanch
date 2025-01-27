import { useEffect, useState } from "react";
import { useUser } from "~/context/userContext";
import config from "~/app/_config/config";
import useLazyLoading from "~/app/_hooks/useLazyLoading";
import { trpc } from "~/server/client";
import { PostStatus } from "~/app/editor/types/types";
import { IterationWithReviews } from "~/app/(with-sidebar)/myfeed/types/types";

type useReviewFeedbackDataReturn = {
  iterationsSentForReview: IterationWithReviews[];
  hasMoreDraftIterations: boolean;
  skip: number;
  setSkip: React.Dispatch<React.SetStateAction<number>>;
  handleScroll: () => void;
  errorMessage: string;
  likedDraftIterations: string[];
  queryLoading: boolean;
};

const useReviewFeedbackData = (): useReviewFeedbackDataReturn => {
  const { user } = useUser();
  const [iterationsSentForReview, setIterationsSentForReview] = useState<IterationWithReviews[]>([]);
  const [skip, setSkip] = useState(0);
  const [hasMoreDraftIterations, setHasMoreDraftIterations] = useState(true);
  const likeMutation = trpc.likes;
  const { data: likedDraftIterations } = likeMutation.getUserLikes.useQuery(
    { userEmail: user?.email ?? "", postStatus: PostStatus.DRAFT.toString().toUpperCase() },
    { enabled: Boolean(user?.id) }
  );
  const getDraftPostIterationsSentForReviewQuery = trpc.draftPostIterationReview.getDraftPostIterationsSentForReview.useQuery;
  const { data: iterationsSentForReviewData, error, isLoading: queryLoading } = getDraftPostIterationsSentForReviewQuery(
    { userId: user?.id ?? "", limit: skip == 0 ? config.lazyLoading.initialLimit : config.lazyLoading.limit, skip },
    { enabled: Boolean(user?.id && hasMoreDraftIterations) }
  );
  

  const { handleScroll } = useLazyLoading({
    queryLoading,
    error: error?.message ?? "",
    initialLimit: config.lazyLoading.initialLimit,
    limit: config.lazyLoading.limit,
    skip,
    setSkip,
    hasMoreData: hasMoreDraftIterations,
    setHasMoreData: setHasMoreDraftIterations,
  });

  useEffect(() => {
    if (!iterationsSentForReviewData) return;
    const transformedData = iterationsSentForReviewData.map(item => ({
      ...item.iteration,
      likes: item.iteration.likes,
      DraftPost: item.iteration.DraftPost,
    }));
    setIterationsSentForReview((prev) => {
      const newIterations = transformedData.filter(
        (newItem) => !prev.some((prevItem) => prevItem.id === newItem.id)
      );
      return [...prev, ...newIterations];
    });
    setHasMoreDraftIterations(iterationsSentForReviewData.length >= config.lazyLoading.limit);
  }, [iterationsSentForReviewData]);

  return {
    iterationsSentForReview,
    hasMoreDraftIterations,
    skip,
    setSkip,
    queryLoading,
    handleScroll,
    errorMessage: error?.message ?? "",
    likedDraftIterations: likedDraftIterations ?? []
  };
};

export default useReviewFeedbackData;